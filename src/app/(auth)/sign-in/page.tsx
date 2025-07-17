import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | AI SaaS Platform",
  description: "Sign in to your account to access the AI SaaS platform",
};

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Sign in to your account to access the platform"
      cardTitle="Sign In"
      cardDescription="Enter your credentials to access your account"
    >
      <SignInForm />
    </AuthLayout>
  );
}
