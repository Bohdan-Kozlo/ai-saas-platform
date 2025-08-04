"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  Heading,
  Image,
  Eraser,
  Scissors,
  FileCheck,
} from "lucide-react";

const navigationItems = [
  {
    title: "Article Generator",
    href: "/generate/article",
    icon: FileText,
    description: "Generate high-quality articles with AI",
  },
  {
    title: "Blog Title Generator",
    href: "/dashboard/blog-title-generator",
    icon: Heading,
    description: "Create compelling blog titles",
  },
  {
    title: "Image Generator",
    href: "/dashboard/image-generator",
    icon: Image,
    description: "Generate stunning images with AI",
  },
  {
    title: "Background Remover",
    href: "/dashboard/background-remover",
    icon: Eraser,
    description: "Remove backgrounds from images",
  },
  {
    title: "Object Remover",
    href: "/dashboard/object-remover",
    icon: Scissors,
    description: "Remove objects from images",
  },
  {
    title: "Resume Analyzer",
    href: "/dashboard/resume-analyzer",
    icon: FileCheck,
    description: "Analyze and improve resumes",
  },
];

interface NavigationItemsProps {
  className?: string;
}

export function NavigationItems({ className }: NavigationItemsProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("space-y-2", className)}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <div className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
