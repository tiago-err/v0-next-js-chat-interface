"use server"

import { db } from "@/lib/db/mock-db"
import type { User } from "@/lib/types"

/**
 * Get all users
 */
export async function getUsers(): Promise<User[]> {
  try {
    const users = await db.users.findAll()

    // Filter out the current user (in a real app, this would be based on authentication)
    return users.filter((user) => user.id !== "current-user")
  } catch (error) {
    console.error("Failed to fetch users:", error)
    throw new Error("Failed to fetch users")
  }
}

/**
 * Get a user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  try {
    return await db.users.findById(userId)
  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}:`, error)
    throw new Error(`Failed to fetch user with ID ${userId}`)
  }
}

/**
 * Search users by name or email
 */
export async function searchUsers(query: string): Promise<User[]> {
  try {
    if (!query.trim()) {
      return await getUsers()
    }

    const users = await db.users.search(query)

    // Filter out the current user (in a real app, this would be based on authentication)
    return users.filter((user) => user.id !== "current-user")
  } catch (error) {
    console.error(`Failed to search users with query "${query}":`, error)
    throw new Error("Failed to search users")
  }
}

/**
 * Update user status
 */
export async function updateUserStatus(userId: string, status: User["status"]): Promise<User | null> {
  try {
    return await db.users.updateStatus(userId, status)
  } catch (error) {
    console.error(`Failed to update status for user with ID ${userId}:`, error)
    throw new Error(`Failed to update status for user with ID ${userId}`)
  }
}
