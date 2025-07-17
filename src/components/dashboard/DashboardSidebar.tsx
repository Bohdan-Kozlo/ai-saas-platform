import { cn } from "@/lib/utils";
import { NavigationItems } from "./NavigationItems";
import { UserProfile } from "./UserProfile";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col border-r bg-background",
        className
      )}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <Link href="/">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">AI SaaS</span>
            </div>
          </Link>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="mb-4">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI Tools
          </h3>
          <NavigationItems />
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4">
        <Separator className="mb-4" />
        <UserProfile />
      </div>
    </div>
  );
}
