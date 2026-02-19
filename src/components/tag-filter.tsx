"use client";

import { Badge } from "@/components/ui/badge";
import type { BookmarkItem } from "@/components/dashboard";

interface TagFilterProps {
  bookmarks: BookmarkItem[];
  activeTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function TagFilter({ bookmarks, activeTag, onTagSelect }: TagFilterProps) {
  // Derive unique tags with counts from all bookmarks
  const tagCounts = new Map<string, number>();
  for (const bookmark of bookmarks) {
    for (const tag of bookmark.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  if (tagCounts.size === 0) return null;

  const sortedTags = [...tagCounts.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map(([tag, count]) => (
        <button key={tag} onClick={() => onTagSelect(activeTag === tag ? null : tag)}>
          <Badge variant={activeTag === tag ? "default" : "outline"}>
            {tag} ({count})
          </Badge>
        </button>
      ))}
      {activeTag && (
        <button onClick={() => onTagSelect(null)}>
          <Badge variant="secondary">Clear filter</Badge>
        </button>
      )}
    </div>
  );
}
