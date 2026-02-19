"use client";

import { useState } from "react";
import { AddBookmarkForm, type NewBookmark } from "@/components/add-bookmark-form";
import { BookmarkList } from "@/components/bookmark-list";
import { TagFilter } from "@/components/tag-filter";
import { SearchBar } from "@/components/search-bar";
import { EditBookmarkDialog } from "@/components/edit-bookmark-dialog";

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
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBookmark, setEditingBookmark] = useState<BookmarkItem | null>(null);
  const [deletingBookmark, setDeletingBookmark] = useState<BookmarkItem | null>(null);

  const filteredBookmarks = bookmarks.filter((b) => {
    if (filterTag && !b.tags.includes(filterTag)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q);
    }
    return true;
  });

  const isFiltering = filterTag !== null || searchQuery !== "";

  function handleEditBookmark(bookmark: BookmarkItem) {
    setEditingBookmark(bookmark);
  }

  function handleDeleteBookmark(bookmark: BookmarkItem) {
    setDeletingBookmark(bookmark);
  }

  function handleSaveEdit(id: string, data: { title: string; url: string; tags: string[] }) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    );
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

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <TagFilter
        bookmarks={bookmarks}
        activeTag={filterTag}
        onTagSelect={setFilterTag}
      />

      <BookmarkList
        bookmarks={filteredBookmarks}
        isFiltering={isFiltering}
        onEdit={handleEditBookmark}
        onDelete={handleDeleteBookmark}
      />

      <EditBookmarkDialog
        bookmark={editingBookmark}
        onClose={() => setEditingBookmark(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
