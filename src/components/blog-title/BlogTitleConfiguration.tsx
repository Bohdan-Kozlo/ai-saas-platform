"use client";

import { useActionState, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Wand2, AlertCircle } from "lucide-react";
import { generateBlogTitlesAction } from "@/server-actions/blog-title-actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BlogTitleGenerationState } from "@/lib/types";

interface BlogTitleConfigurationProps {
  onTitlesGenerated?: (state: BlogTitleGenerationState) => void;
}

export function BlogTitleConfiguration({
  onTitlesGenerated,
}: BlogTitleConfigurationProps) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const [state, action, isPending] = useActionState(generateBlogTitlesAction, {
    success: false,
    error: undefined,
    titles: undefined,
    isGenerating: false,
  });

  useEffect(() => {
    if (onTitlesGenerated && (state.success || state.error)) {
      onTitlesGenerated(state);
    }
  }, [state, onTitlesGenerated]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Blog Title Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          {/* Error Alert */}
          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {state.success && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Blog titles generated successfully!
              </AlertDescription>
            </Alert>
          )}

          {/* Keyword Input */}
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword</Label>
            <Input
              id="keyword"
              name="keyword"
              type="text"
              placeholder="Enter your main keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={isPending}
              className="w-full"
              required
              minLength={2}
            />
            <p className="text-xs text-muted-foreground">
              Enter the main topic or keyword for your blog titles
            </p>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              value={category}
              onValueChange={setCategory}
              disabled={isPending}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food & Cooking</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="personal-development">
                  Personal Development
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose the category that best fits your content
            </p>
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!keyword || !category || isPending}
            size="lg"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Blog Titles
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
