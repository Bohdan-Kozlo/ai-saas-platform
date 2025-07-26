"use server";

import { signInSchema, signUpSchema } from "@/lib/schemas/auth.schema";
import { ActionResponse } from "@/lib/types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signInAction(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const data = Object.fromEntries(formData.entries());

    const parsed = signInSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: "Invalid credentials",
      };
    }

    const { email, password } = parsed.data;

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (!result) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      error: "Failed to sign in. Please try again.",
    };
  }
  redirect("/dashboard");
}

export async function signUpAction(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const data = Object.fromEntries(formData.entries());

    const parsed = signUpSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: "Please fix the errors below",
      };
    }

    const { name, email, password } = parsed.data;

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    if (!result) {
      return {
        success: false,
        error: "Failed to create account. Email might already be in use.",
      };
    }
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      success: false,
      error: "Failed to create account. Please try again.",
    };
  }
  redirect("/dashboard");
}

export async function signInWithProvider(provider: "google" | "github") {
  const result = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
    },
    headers: await headers(),
  });

  if (result?.url) {
    redirect(result.url);
  }
}

export async function signOutAction(): Promise<ActionResponse> {
  try {
    const result = await auth.api.signOut({
      headers: await headers(),
    });

    if (!result) {
      return {
        success: false,
        error: "Failed to sign out. Please try again.",
      };
    }
    return {
      success: true,
      message: "Successfully signed out",
    };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: "Failed to sign out. Please try again.",
    };
  }
}
