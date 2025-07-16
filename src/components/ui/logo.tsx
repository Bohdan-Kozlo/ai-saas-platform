import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconBgClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg",
          iconBgClasses[size]
        )}
      >
        <Sparkles className={cn("text-white", sizeClasses[size])} />
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
            textSizeClasses[size]
          )}
        >
          AI SaaS
        </span>
      )}
    </div>
  );
}
