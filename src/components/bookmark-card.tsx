"use client";

import { ExternalLink, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BookmarkItem } from "@/components/dashboard";

interface BookmarkCardProps {
  bookmark: BookmarkItem;
  onEdit: (bookmark: BookmarkItem) => void;
  onDelete: (bookmark: BookmarkItem) => void;
}

export function BookmarkCard({ bookmark, onEdit, onDelete }: BookmarkCardProps) {
  const displayUrl = bookmark.url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <Card className="group relative">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="font-medium leading-tight">{bookmark.title}</h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <span className="truncate">{displayUrl}</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                aria-label="Bookmark actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(bookmark)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(bookmark)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {bookmark.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {bookmark.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
