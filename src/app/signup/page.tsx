"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    // Validate password requirements
    if (
      !passwordRules.minLength ||
      !passwordRules.uppercase ||
      !passwordRules.number
    ) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase letter, and one number.",
      );
      return;
    }

    // Validate password confirmation
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Sign-up failed. Please try again.");
      // console.error("Sign-up error:", error);
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      // console.log("Sign-up successful:", data);
      redirect("/signin");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f1f5f1] px-4 font-sans text-[#202820]">
      <main className="w-full max-w-71.5">
        {/* Heading */}
        <div className="mb-4 text-center">
          <h1 className="text-[18px] font-bold leading-7">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-0.5 whitespace-nowrap text-[10px] text-[#7b827b]">
            বিনা খরচে সাইন আপ করে সব ফিচার ব্যবহার শুরু করুন।
          </p>
        </div>

        {/* Sign-up Card */}
        <div className="w-full rounded-xl border border-[#e2e9e2] bg-[#fafcf9] px-4 pb-4 pt-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-[12px] font-medium"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                autoComplete="name"
                required
                className="h-7 w-full rounded-md border border-[#e3e9e3] bg-transparent px-2 text-[12px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[12px] font-medium"
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
                className="h-7 w-full rounded-md border border-[#e3e9e3] bg-transparent px-2 text-[12px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />
            </div>
            {/* Password */}{" "}
            <div>
              {" "}
              <label
                htmlFor="password"
                className="mb-1 block text-[12px] font-medium"
              >
                {" "}
                পাসওয়ার্ড{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="৮+ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-7 w-full rounded-md border border-[#e3e9e3] bg-transparent px-2 pr-8 text-[11px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#858b85] hover:text-[#07883f]"
                >
                  {" "}
                  {showPassword ? (
                    <FaEyeSlash size={12} />
                  ) : (
                    <FaEye size={12} />
                  )}{" "}
                </button>{" "}
              </div>{" "}
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-[12px] font-medium"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="আবার লিখুন"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-7 w-full rounded-md border border-[#e3e9e3] bg-transparent px-2 pr-8 text-[12px] outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#858b85] hover:text-[#07883f]"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={12} />
                  ) : (
                    <FaEye size={12} />
                  )}
                </button>
              </div>
            </div>
            {/* Create Account Button */}
            <button
              type="submit"
              className="h-7.25 w-full rounded-md bg-[#07883f] text-[12px] font-semibold text-white shadow-[0_2px_2px_rgba(0,0,0,0.25)] transition hover:bg-[#067737] active:translate-y-px"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e0e6e0]" />

            <span className="text-[12px] text-[#777e77]">অথবা</span>

            <div className="h-px flex-1 bg-[#e0e6e0]" />
          </div>

          {/* Social Sign-up */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-7.25 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e3e9e3] px-1 text-[9px] font-medium transition hover:bg-[#f1f5f1]"
            >
              <FcGoogle className="shrink-0 text-[12px]" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="flex h-7.25 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e3e9e3] px-1 text-[9px] font-medium transition hover:bg-[#f1f5f1]"
            >
              <FaGithub className="shrink-0 text-[12px]" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign-in Link */}
          <p className="mt-3 text-center text-[12px] text-[#737b73]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#07883f] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-[12px] text-[#8a918a] transition hover:text-[#07883f]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
