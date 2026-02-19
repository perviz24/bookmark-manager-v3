"use client";

// SESSION NOTE: UserButton from @clerk/nextjs removed temporarily.
// Restore when Clerk env vars are configured.
import { Bookmark } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          <span className="text-lg font-semibold tracking-tight">
            Bookmarks
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
