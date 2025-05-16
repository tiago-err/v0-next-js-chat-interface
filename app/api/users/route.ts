import { NextResponse } from "next/server"
import { getUsers, searchUsers } from "@/lib/actions/user-actions"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (query) {
      const users = await searchUsers(query)
      return NextResponse.json(users)
    } else {
      const users = await getUsers()
      return NextResponse.json(users)
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
