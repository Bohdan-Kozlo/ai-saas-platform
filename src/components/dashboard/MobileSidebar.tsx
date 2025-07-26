import { MobileSidebarClient } from "./MobileSidebarClient";
import { DashboardSidebar } from "./DashboardSidebar";

export function MobileSidebar() {
  return (
    <MobileSidebarClient>
      <DashboardSidebar />
    </MobileSidebarClient>
  );
}
