"use client";

import { useState } from "react";
import { AddBookmarkForm, type NewBookmark } from "@/components/add-bookmark-form";
import { BookmarkList } from "@/components/bookmark-list";

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
  const [editingBookmark, setEditingBookmark] = useState<BookmarkItem | null>(null);
  const [deletingBookmark, setDeletingBookmark] = useState<BookmarkItem | null>(null);

  function handleEditBookmark(bookmark: BookmarkItem) {
    setEditingBookmark(bookmark);
  }

  function handleDeleteBookmark(bookmark: BookmarkItem) {
    setDeletingBookmark(bookmark);
  }

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

      <BookmarkList
        bookmarks={bookmarks}
        onEdit={handleEditBookmark}
        onDelete={handleDeleteBookmark}
      />
    </div>
  );
}
