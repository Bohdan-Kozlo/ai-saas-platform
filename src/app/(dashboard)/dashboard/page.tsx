import { isAuthenticatedUser } from "@/lib/auth";

export default async function DashboardPage() {
  await isAuthenticatedUser();
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
