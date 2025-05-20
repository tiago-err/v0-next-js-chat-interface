"use client";

import type React from "react";

import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

interface ResponsiveChatLayoutProps {
	sidebar: React.ReactNode;
	content: ({toggleSidebar}: {toggleSidebar: VoidFunction}) => React.ReactNode;
	isMobile: boolean;
}

export default function ResponsiveChatLayout({sidebar, content, isMobile}: ResponsiveChatLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
	const pathname = usePathname();

	// Reset sidebar state when route changes on mobile
	useEffect(() => {
		if (isMobile) {
			setSidebarOpen(false);
		}
	}, [pathname, isMobile]);

	// Update sidebar state when screen size changes
	useEffect(() => {
		setSidebarOpen(!isMobile);
	}, [isMobile]);

	// Toggle sidebar
	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	return (
		<div className="flex w-full h-[100svh] overflow-hidden bg-background">
			{/* Sidebar wrapper with animation */}
			<div
				className={cn(
					"transition-all duration-300 ease-in-out",
					sidebarOpen ? "w-full md:w-80 lg:w-96" : "w-0",
					isMobile && sidebarOpen ? "absolute inset-y-0 left-0 z-40" : "relative",
				)}>
				{/* Sidebar content */}
				<div className={cn("h-full", !sidebarOpen && "hidden")}>{sidebar}</div>
			</div>

			{/* Overlay for mobile when sidebar is open */}
			{isMobile && sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setSidebarOpen(false)} aria-hidden="true" />}

			{/* Main content area */}
			<div
				className={cn(
					"flex-1 flex flex-col transition-all duration-300 ease-in-out",
					isMobile && sidebarOpen ? "opacity-50" : "opacity-100",
				)}>
				{/* Pass toggleSidebar function to content */}
				{content({toggleSidebar})}
			</div>
		</div>
	);
}
