"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/server-actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const onSignOut = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const response = await signOutAction();
    if (!response.success) {
      toast.error(response.error ?? "An unknown error occurred.");
    }
    toast.success(response.message ?? "Successfully signed out");
    router.push("/sign-in");
  };

  return (
    <DropdownMenuItem onClick={onSignOut} className="text-red-600">
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </DropdownMenuItem>
  );
}
