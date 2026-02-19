"use client";

import { Bookmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkCard } from "@/components/bookmark-card";
import type { BookmarkItem } from "@/components/dashboard";

interface BookmarkListProps {
  bookmarks: BookmarkItem[];
  isLoading?: boolean;
  onEdit: (bookmark: BookmarkItem) => void;
  onDelete: (bookmark: BookmarkItem) => void;
}

export function BookmarkList({
  bookmarks,
  isLoading,
  onEdit,
  onDelete,
}: BookmarkListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="rounded-full bg-muted p-3">
          <Bookmark className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="font-medium">No bookmarks yet</p>
        <p className="text-sm text-muted-foreground">
          Add your first bookmark using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
