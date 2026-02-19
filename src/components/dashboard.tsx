"use client";

import { useState } from "react";
import { Bookmark as BookmarkIcon } from "lucide-react";
import { AddBookmarkForm, type NewBookmark } from "@/components/add-bookmark-form";

// SESSION NOTE: Local state for now. Replace with useQuery(api.bookmarks.list)
// when Convex is configured. All child components receive bookmarks as props.
export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  tags: string[];
  createdAt: number;
}

export function Dashboard() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  function handleAddBookmark(newBookmark: NewBookmark) {
    const bookmark: BookmarkItem = {
      id: crypto.randomUUID(),
      ...newBookmark,
      createdAt: Date.now(),
    };
    setBookmarks((prev) => [bookmark, ...prev]);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Bookmarks</h1>
        <p className="mt-1 text-muted-foreground">
          Save and organize your favorite links
        </p>
      </div>

      <AddBookmarkForm onAdd={handleAddBookmark} />

      {/* Bookmark list — Feature #3 will replace this empty state */}
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="rounded-full bg-muted p-3">
            <BookmarkIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="font-medium">No bookmarks yet</p>
          <p className="text-sm text-muted-foreground">
            Add your first bookmark using the form above
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {bookmarks.length} bookmark{bookmarks.length !== 1 && "s"} saved
        </p>
      )}
    </div>
  );
}
