"use client";

import React, { Suspense, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the page the user wanted to visit before signing in.
  const callbackURL = searchParams.get("callbackURL");

  // Allow only local paths to prevent external redirects.
  const destination =
    callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: destination,
      });

      if (error) {
        toast.error(error.message || "Sign-in failed. Please try again.");
        return;
      }

      toast.success("Signed in successfully!");

      // Return to the originally requested product details page.
      router.replace(destination);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      toast.info("Redirecting to Google...");
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: destination,
      });
      if (error) {
        toast.error(
          error.message || "Google sign-in failed. Please try again.",
        );
      }
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };
  const handleGithubSignIn = async () => {
    try {
      toast.info("Redirecting to GitHub...");
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: destination,
      });
      if (error) {
        toast.error(
          error.message || "GitHub sign-in failed. Please try again.",
        );
      }
    } catch {
      toast.error("GitHub sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f1f5f1] flex pt-8 sm:pt-10 justify-center px-4 sm:px-6 pb-8 font-sans text-[#202820]">
      <main className="w-full max-w-sm sm:max-w-md">
        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-xl sm:text-2xl font-bold leading-8">সাইন ইন</h1>

          <p className="mt-1 text-xs sm:text-sm leading-5 text-[#7b827b]">
            নির্বাচিত নাম, রাজস্ব মূল্য ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign-in Card */}
        <div className="w-full rounded-xl border border-[#e2e9e2] bg-[#fafcf9] px-4 sm:px-6 pb-5 pt-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs sm:text-sm font-medium"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-9 sm:h-10 w-full rounded-md border border-[#e3e9e3] bg-transparent px-3 text-xs sm:text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs sm:text-sm font-medium"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="৮+ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className="h-9 sm:h-10 w-full rounded-md border border-[#e3e9e3] bg-transparent px-3 pr-9 text-xs sm:text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#858b85] hover:text-[#07883f]"
                >
                  {showPassword ? (
                    <FaEyeSlash size={15} />
                  ) : (
                    <FaEye size={15} />
                  )}
                </button>
              </div>
            </div>

            {/* Sign-in Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-9 sm:h-10 w-full rounded-md bg-[#07883f] text-sm font-semibold text-white shadow-[0_2px_2px_rgba(0,0,0,0.25)] transition hover:bg-[#067737] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e0e6e0]" />
            <span className="text-xs sm:text-sm text-[#777e77]">অথবা</span>
            <div className="h-px flex-1 bg-[#e0e6e0]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex min-h-9 sm:min-h-10 items-center justify-center gap-1.5 rounded-md border border-[#e3e9e3] px-2 py-2 text-xs sm:text-sm font-medium transition hover:bg-[#f1f5f1]"
            >
              <FcGoogle className="shrink-0 text-base" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="flex min-h-9 sm:min-h-10 items-center justify-center gap-1.5 rounded-md border border-[#e3e9e3] px-2 py-2 text-xs sm:text-sm font-medium transition hover:bg-[#f1f5f1]"
            >
              <FaGithub className="shrink-0 text-base" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign-up Link */}
          <p className="mt-4 text-center text-xs sm:text-sm leading-5 text-[#737b73]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#07883f] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs sm:text-sm text-[#8a918a] transition hover:text-[#07883f]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    </div>
  );
};

const SignInPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f1f5f1] text-sm text-[#202820]">
          লোড হচ্ছে...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
};

export default SignInPage;
