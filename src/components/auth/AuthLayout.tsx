import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  cardTitle: string;
  cardDescription: string;
  showFeatures?: boolean;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  cardTitle,
  cardDescription,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {cardTitle}
            </CardTitle>
            <CardDescription className="text-center">
              {cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>By signing up, you agree to our</p>
          <div className="space-x-1">
            <Link href="/terms" className="hover:text-blue-600 hover:underline">
              Terms of Service
            </Link>
            <span>and</span>
            <Link
              href="/privacy"
              className="hover:text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
