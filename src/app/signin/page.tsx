"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const formData = new FormData(e.target);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign-in failed. Please try again.");
        return;
      }

      if (data) {
        toast.success("Signed in successfully!");
        router.push("/");
        router.refresh();
      }
    } catch {
      // console.error("Sign-in error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f1f5f1] flex pt-10 justify-center px-4 font-sans text-[#202820]">
      <main className="w-full max-w-71.5">
        {/* Heading */}
        <div className="mb-4 text-center">
          <h1 className="text-[18px] font-bold leading-7">সাইন ইন</h1>

          <p className="mt-0.5 whitespace-nowrap text-[10px] text-[#7b827b]">
            নির্বাচিত নাম, রাজস্ব মূল্য ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign-in Card */}
        <div className="w-full rounded-xl border border-[#e2e9e2] bg-[#fafcf9] px-4 pb-4 pt-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[10px] font-medium"
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
                className="h-7 w-full rounded-md border border-[#e3e9e3] bg-transparent px-2.5 text-[10px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[10px] font-medium"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className="h-7 w-full rounded-md border border-[#e3e9e3] bg-transparent px-2.5 pr-8 text-[10px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#858b85] hover:text-[#07883f]"
                >
                  {showPassword ? (
                    <FaEyeSlash size={12} />
                  ) : (
                    <FaEye size={12} />
                  )}
                </button>
              </div>
            </div>

            {/* Sign-in Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-7.25 w-full rounded-md bg-[#07883f] text-[10px] font-semibold text-white shadow-[0_2px_2px_rgba(0,0,0,0.25)] transition hover:bg-[#067737] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e0e6e0]" />
            <span className="text-[10px] text-[#777e77]">অথবা</span>
            <div className="h-px flex-1 bg-[#e0e6e0]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                toast.info("Google sign-in is not configured yet.")
              }
              className="flex h-7.25 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e3e9e3] px-1 text-[9px] font-medium transition hover:bg-[#f1f5f1]"
            >
              <FcGoogle className="shrink-0 text-[12px]" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() =>
                toast.info("GitHub sign-in is not configured yet.")
              }
              className="flex h-7.25 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e3e9e3] px-1 text-[9px] font-medium transition hover:bg-[#f1f5f1]"
            >
              <FaGithub className="shrink-0 text-[12px]" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign-up Link */}
          <p className="mt-3 text-center text-[10px] text-[#737b73]">
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
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-[10px] text-[#8a918a] transition hover:text-[#07883f]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
