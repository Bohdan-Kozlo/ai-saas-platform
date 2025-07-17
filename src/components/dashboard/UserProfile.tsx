"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  // Mock data for design purposes
  const mockUser = user || {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
  };

  const initials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  function onSignOut(event: React.MouseEvent): void {
    event.preventDefault();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-auto p-3 hover:bg-accent"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={mockUser.image} alt={mockUser.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium">{mockUser.name}</span>
            <span className="text-xs text-muted-foreground">
              {mockUser.email}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
