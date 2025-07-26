"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, GitHubIcon } from "@/components/ui/icons";
import { Eye, EyeOff } from "lucide-react";
import { signInAction, signInWithProvider } from "@/server-actions/auth";
import { useState } from "react";
import { ActionResponse } from "@/lib/types";

const initialState: ActionResponse = {};

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleProviderSignIn = async (provider: "google" | "github") => {
    try {
      await signInWithProvider(provider);
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleProviderSignIn("google")}
          className="h-11 hover:bg-gray-50 transition-colors"
        >
          <GoogleIcon className="mr-2" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleProviderSignIn("github")}
          className="h-11 hover:bg-gray-50 transition-colors"
        >
          <GitHubIcon className="mr-2" />
          GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {state.error}
        </div>
      )}

      {state.message && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
          {state.message}
        </div>
      )}

      {/* Email/Password Form */}
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="h-11"
            disabled={isPending}
          />
          {state.errors?.email && (
            <p className="text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="h-11 pr-10"
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isPending}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
          {state.errors?.password && (
            <p className="text-xs text-red-500">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
