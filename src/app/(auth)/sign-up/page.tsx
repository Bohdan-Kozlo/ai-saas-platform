import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | AI SaaS Platform",
  description: "Create a new account to start using the AI SaaS platform",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your journey with AI SaaS platform"
      cardTitle="Sign Up"
      cardDescription="Fill out the form to create a new account"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
