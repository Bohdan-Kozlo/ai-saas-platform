"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, GitHubIcon } from "@/components/ui/icons";
import { Eye, EyeOff } from "lucide-react";
import { signInWithProvider, signUpAction } from "@/server-actions/auth";
import { ActionResponse } from "@/lib/types";

const initialState: ActionResponse = {};

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const handleProviderSignUp = async (provider: "google" | "github") => {
    try {
      await signInWithProvider(provider);
    } catch (error) {
      console.error(`${provider} sign up error:`, error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
  };

  return (
    <div className="space-y-6">
      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleProviderSignUp("google")}
          className="h-11 hover:bg-gray-50 transition-colors"
        >
          <GoogleIcon className="mr-2" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleProviderSignUp("github")}
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
          <span className="bg-white px-2 text-gray-500">Or sign up with</span>
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

      {/* Registration Form */}
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="h-11"
            disabled={isPending}
          />
          {state.errors?.name && (
            <p className="text-xs text-red-500">{state.errors.name[0]}</p>
          )}
        </div>

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
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handlePasswordChange}
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

          {/* Password Requirements */}
          {formData.password}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className={`h-11 pr-10 ${
                formData.confirmPassword && !doPasswordsMatch
                  ? "border-red-300 focus:border-red-500"
                  : ""
              }`}
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isPending}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
          {formData.confirmPassword && !doPasswordsMatch && (
            <p className="text-xs text-red-500">Passwords do not match</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
          disabled={isPending || !doPasswordsMatch}
        >
          {isPending ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
