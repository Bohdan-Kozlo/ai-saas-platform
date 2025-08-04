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
import { generateArticleAction } from "@/server-actions/article-actions";
import { ArticleGenerationState } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ArticleConfigurationProps {
  onContentGenerated?: (state: ArticleGenerationState) => void;
}

export function ArticleConfiguration({
  onContentGenerated,
}: ArticleConfigurationProps) {
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("");

  const [state, action, isPending] = useActionState(generateArticleAction, {
    success: false,
    error: undefined,
    content: undefined,
    isGenerating: false,
  });

  useEffect(() => {
    if (onContentGenerated && (state.success || state.error)) {
      onContentGenerated(state);
    }
  }, [state, onContentGenerated]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Article Configuration
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
                Article generated successfully!
              </AlertDescription>
            </Alert>
          )}

          {/* Article Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic">Article Topic</Label>
            <Input
              id="topic"
              name="topic"
              type="text"
              placeholder="Enter your article topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isPending}
              className="w-full"
              required
              minLength={3}
            />
            <p className="text-xs text-muted-foreground">
              Describe what you want your article to be about
            </p>
          </div>

          {/* Article Length */}
          <div className="space-y-2">
            <Label htmlFor="length">Article Length</Label>
            <Select
              name="length"
              value={length}
              onValueChange={setLength}
              disabled={isPending}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select article length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (300-500 words)</SelectItem>
                <SelectItem value="medium">Medium (500-1000 words)</SelectItem>
                <SelectItem value="long">Long (1000-2000 words)</SelectItem>
                <SelectItem value="extended">Extended (2000+ words)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose the desired length for your article
            </p>
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!topic || !length || isPending}
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
                Generate Article
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
