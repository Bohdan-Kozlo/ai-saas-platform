import { MobileSidebar } from "./MobileSidebar";

export function DashboardHeader() {
  return (
    <header className="flex h-7 items-center gap-4 border-b bg-background px-3">
      <MobileSidebar />
    </header>
  );
}
