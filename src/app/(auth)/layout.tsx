import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | AI SaaS Platform",
  description: "Sign in or create an account to access the AI SaaS platform",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {children}
    </div>
  );
}
