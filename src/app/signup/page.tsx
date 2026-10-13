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

  const handleGoogleSignUp = async () => {
    try {
      toast.info("Redirecting to Google...");
      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(
          error.message || "Google sign-up failed. Please try again.",
        );
      }
    } catch {
      toast.error("Google sign-up failed. Please try again.");
    }
  };

  const handleGithubSignUp = async () => {
    try {
      toast.info("Redirecting to GitHub...");
      const { error } = await authClient.signIn.social({
        provider: "github",
      });

      if (error) {
        toast.error(
          error.message || "GitHub sign-up failed. Please try again.",
        );
      }
    } catch {
      toast.error("GitHub sign-up failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f1f5f1] px-4 py-8 font-sans text-[#202820] sm:px-6 sm:py-10">
      {" "}
      <main className="w-full max-w-sm sm:max-w-md">
        {" "}
        {/* Heading */}{" "}
        <div className="mb-5 text-center">
          {" "}
          <h1 className="text-xl font-bold leading-8 sm:text-2xl">
            {" "}
            অ্যাকাউন্ট তৈরি করুন{" "}
          </h1>{" "}
          <p className="mt-1 text-xs leading-5 text-[#7b827b] sm:text-sm">
            {" "}
            বিনা খরচে সাইন আপ করে সব ফিচার ব্যবহার শুরু করুন।{" "}
          </p>{" "}
        </div>{" "}
        {/* Sign-up Card */}{" "}
        <div className="w-full rounded-xl border border-[#e2e9e2] bg-[#fafcf9] px-4 pb-5 pt-5 sm:px-6">
          {" "}
          <form onSubmit={handleSubmit} className="space-y-4">
            {" "}
            {/* Name */}{" "}
            <div>
              {" "}
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-medium sm:text-sm"
              >
                {" "}
                নাম{" "}
              </label>{" "}
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                autoComplete="name"
                required
                className="h-9 w-full rounded-md border border-[#e3e9e3] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100 sm:h-10"
              />{" "}
            </div>{" "}
            {/* Email */}{" "}
            <div>
              {" "}
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium sm:text-sm"
              >
                {" "}
                ইমেইল{" "}
              </label>{" "}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-9 w-full rounded-md border border-[#e3e9e3] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100 sm:h-10"
              />{" "}
            </div>{" "}
            {/* Password */}{" "}
            <div>
              {" "}
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium sm:text-sm"
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
                  className="h-9 w-full rounded-md border border-[#e3e9e3] bg-transparent px-3 pr-9 text-xs outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100 sm:h-10 sm:text-sm"
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#858b85] hover:text-[#07883f]"
                >
                  {" "}
                  {showPassword ? (
                    <FaEyeSlash size={15} />
                  ) : (
                    <FaEye size={15} />
                  )}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            {/* Confirm Password */}{" "}
            <div>
              {" "}
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-medium sm:text-sm"
              >
                {" "}
                পাসওয়ার্ড নিশ্চিত করুন{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="আবার লিখুন"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-9 w-full rounded-md border border-[#e3e9e3] bg-transparent px-3 pr-9 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100 sm:h-10"
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#858b85] hover:text-[#07883f]"
                >
                  {" "}
                  {showConfirmPassword ? (
                    <FaEyeSlash size={15} />
                  ) : (
                    <FaEye size={15} />
                  )}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            {/* Create Account Button */}{" "}
            <button
              type="submit"
              className="h-9 w-full rounded-md bg-[#07883f] text-sm font-semibold text-white shadow-[0_2px_2px_rgba(0,0,0,0.25)] transition hover:bg-[#067737] active:translate-y-px sm:h-10"
            >
              {" "}
              অ্যাকাউন্ট তৈরি করুন{" "}
            </button>{" "}
          </form>{" "}
          {/* Divider */}{" "}
          <div className="my-4 flex items-center gap-3">
            {" "}
            <div className="h-px flex-1 bg-[#e0e6e0]" />{" "}
            <span className="text-xs text-[#777e77] sm:text-sm">অথবা</span>{" "}
            <div className="h-px flex-1 bg-[#e0e6e0]" />{" "}
          </div>{" "}
          {/* Social Sign-up */}{" "}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {" "}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-[#e3e9e3] px-2 py-2 text-xs font-medium transition hover:bg-[#f1f5f1] sm:min-h-10 sm:text-sm"
            >
              {" "}
              <FcGoogle className="shrink-0 text-base" /> Google দিয়ে চালিয়ে
              যান{" "}
            </button>{" "}
            <button
              type="button"
              onClick={handleGithubSignUp}
              className="flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-[#e3e9e3] px-2 py-2 text-xs font-medium transition hover:bg-[#f1f5f1] sm:min-h-10 sm:text-sm"
            >
              {" "}
              <FaGithub className="shrink-0 text-base" /> GitHub দিয়ে চালিয়ে
              যান{" "}
            </button>{" "}
          </div>{" "}
          {/* Sign-in Link */}{" "}
          <p className="mt-4 text-center text-xs leading-5 text-[#737b73] sm:text-sm">
            {" "}
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#07883f] hover:underline"
            >
              {" "}
              সাইন ইন করুন{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
        {/* Back to Home */}{" "}
        <div className="mt-5 text-center">
          {" "}
          <Link
            href="/"
            className="text-xs text-[#8a918a] transition hover:text-[#07883f] sm:text-sm"
          >
            {" "}
            ← হোম পেজে ফিরে যান{" "}
          </Link>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
};

export default SignUpPage;
