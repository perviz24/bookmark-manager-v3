"use client";

import { Bookmark } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Bookmarks</h1>
        <p className="mt-1 text-muted-foreground">
          Save and organize your favorite links
        </p>
      </div>

      {/* Placeholder — components added in upcoming features */}
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="rounded-full bg-muted p-3">
          <Bookmark className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="font-medium">No bookmarks yet</p>
        <p className="text-sm text-muted-foreground">
          Add your first bookmark using the form above
        </p>
      </div>
    </div>
  );
}
