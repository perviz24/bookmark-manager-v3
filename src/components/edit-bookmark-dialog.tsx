"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/tag-input";
import { toast } from "sonner";
import type { BookmarkItem } from "@/components/dashboard";

interface EditBookmarkDialogProps {
  bookmark: BookmarkItem | null;
  onClose: () => void;
  onSave: (id: string, data: { title: string; url: string; tags: string[] }) => void;
}

export function EditBookmarkDialog({
  bookmark,
  onClose,
  onSave,
}: EditBookmarkDialogProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title);
      setUrl(bookmark.url);
      setTags([...bookmark.tags]);
    }
  }, [bookmark]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!bookmark) return;

    if (!title.trim() || !url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    onSave(bookmark.id, { title: title.trim(), url: url.trim(), tags });
    toast.success("Bookmark updated");
    onClose();
  }

  return (
    <Dialog open={bookmark !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-url">URL</Label>
            <Input
              id="edit-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput tags={tags} onTagsChange={setTags} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
