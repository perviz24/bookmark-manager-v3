"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TagInput } from "@/components/tag-input";
import { toast } from "sonner";

export interface NewBookmark {
  title: string;
  url: string;
  tags: string[];
}

interface AddBookmarkFormProps {
  onAdd: (bookmark: NewBookmark) => void;
}

export function AddBookmarkForm({ onAdd }: AddBookmarkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    onAdd({ title: title.trim(), url: url.trim(), tags });
    setTitle("");
    setUrl("");
    setTags([]);
    toast.success("Bookmark added");
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="React Documentation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://react.dev"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput tags={tags} onTagsChange={setTags} />
          </div>
          <Button type="submit" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Bookmark
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
