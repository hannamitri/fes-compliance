"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, sitePassword, token } from "@/lib/auth";

export async function login(_: { error?: string } | undefined, formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");
  if (!sitePassword() || pw !== sitePassword()) {
    return { error: "That password is not right." };
  }
  const jar = await cookies();
  jar.set(COOKIE, await token(pw), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect(next.startsWith("/") ? next : "/");
}
