
"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

type SocialProvider = "google" | "github";

const SocialLoginButtons = () => {
  const searchParams = useSearchParams();

  const [loadingProvider, setLoadingProvider] =
    useState<SocialProvider | null>(null);

  const callbackURL = searchParams.get("callbackURL");

  const destination =
    callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  const handleSocialSignIn = async (provider: SocialProvider) => {
    if (loadingProvider) return;

    setLoadingProvider(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: destination,
        errorCallbackURL: `/signin?error=social_signin_failed&provider=${provider}`,
      });

      if (error) {
        toast.error(
          error.message ||
            `${provider === "google" ? "Google" : "GitHub"} sign-in failed. Please sign up first if you don't have an account.`
        );

        setLoadingProvider(null);
      }
    } catch {
      toast.error(
        `Unable to sign in with ${provider === "google" ? "Google" : "GitHub"}. Please try again.`
      );

      setLoadingProvider(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => handleSocialSignIn("google")}
        disabled={loadingProvider !== null}
        className="flex h-7.25 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e3e9e3] px-1 text-[9px] font-medium transition hover:bg-[#f1f5f1] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FcGoogle className="shrink-0 text-[12px]" />
        {loadingProvider === "google"
          ? "লোড হচ্ছে..."
          : "Google দিয়ে চালিয়ে যান"}
      </button>

      <button
        type="button"
        onClick={() => handleSocialSignIn("github")}
        disabled={loadingProvider !== null}
        className="flex h-7.25 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-[#e3e9e3] px-1 text-[9px] font-medium transition hover:bg-[#f1f5f1] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaGithub className="shrink-0 text-[12px]" />
        {loadingProvider === "github"
          ? "লোড হচ্ছে..."
          : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
};

const SocialLogin = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center text-xs">লোড হচ্ছে...</div>
      }
    >
      <SocialLoginButtons />
    </Suspense>
  );
};

export default SocialLogin;
