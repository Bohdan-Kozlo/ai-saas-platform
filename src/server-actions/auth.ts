"use server";

import { redirect } from "next/navigation";

export interface AuthState {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function signInAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "on";

  // Basic validation
  if (!email || !password) {
    return {
      error: "Email and password are required",
      success: false,
    };
  }

  if (!email.includes("@")) {
    return {
      error: "Please enter a valid email address",
      success: false,
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters long",
      success: false,
    };
  }

  try {
    // TODO: Implement actual authentication with better-auth
    console.log("Sign in attempt:", { email, rememberMe });

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, simulate success
    // In real implementation, integrate with better-auth here

    // Redirect to dashboard on success
    redirect("/dashboard");
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      error: "Invalid email or password",
      success: false,
    };
  }
}

export async function signUpAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const acceptTerms = formData.get("acceptTerms") === "on";

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return {
      error: "All fields are required",
      success: false,
    };
  }

  if (!email.includes("@")) {
    return {
      error: "Please enter a valid email address",
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters long",
      success: false,
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      error: "Password must contain at least one uppercase letter",
      success: false,
    };
  }

  if (!/\d/.test(password)) {
    return {
      error: "Password must contain at least one number",
      success: false,
    };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      error: "Password must contain at least one special character",
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
    };
  }

  if (!acceptTerms) {
    return {
      error: "You must accept the terms and conditions",
      success: false,
    };
  }

  try {
    // TODO: Implement actual user registration with better-auth
    console.log("Sign up attempt:", { name, email });

    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, simulate success
    // In real implementation, integrate with better-auth here

    // Redirect to sign-in page with success message
    redirect("/sign-in?message=Account created successfully. Please sign in.");
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      error: "An error occurred while creating your account. Please try again.",
      success: false,
    };
  }
}

export async function signInWithProvider(provider: "google" | "github") {
  try {
    // TODO: Implement OAuth sign-in with better-auth
    console.log(`Sign in with ${provider}`);

    // In real implementation, this would redirect to OAuth provider
    // For now, just simulate success
    redirect("/dashboard");
  } catch (error) {
    console.error(`${provider} sign in error:`, error);
    throw new Error(`Failed to sign in with ${provider}`);
  }
}
