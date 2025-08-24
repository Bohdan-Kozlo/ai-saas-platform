import { isAuthenticatedUser } from "@/lib/auth";
import { ImageIcon } from "lucide-react";
import { ImageGeneratorClient } from "@/components/image/ImageGeneratorClient";

export default async function ImageGenerationPage() {
  await isAuthenticatedUser();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-500 text-white">
          <ImageIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Image Generator</h1>
          <p className="text-muted-foreground">
            Describe an image and pick a style to generate a visual
          </p>
        </div>
      </div>
      <ImageGeneratorClient />
    </div>
  );
}
