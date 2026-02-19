"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { BookmarkItem } from "@/components/dashboard";

interface DeleteBookmarkDialogProps {
  bookmark: BookmarkItem | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteBookmarkDialog({
  bookmark,
  onClose,
  onConfirm,
}: DeleteBookmarkDialogProps) {
  function handleDelete() {
    if (!bookmark) return;
    onConfirm(bookmark.id);
    toast.success("Bookmark deleted");
    onClose();
  }

  return (
    <Dialog open={bookmark !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete bookmark?</DialogTitle>
          <DialogDescription>
            This will permanently delete &ldquo;{bookmark?.title}&rdquo;. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
