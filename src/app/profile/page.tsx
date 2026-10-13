
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const displayName = name ?? user?.name ?? "";

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = displayName.trim();

    if (!updatedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (updatedName === user?.name) {
      toast.info("Your name is already up to date.");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "Failed to update your name.");
        return;
      }

      setName(null);

      toast.success("Your name has been updated successfully.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out.");
        return;
      }

      toast.success("Signed out successfully.");
      router.replace("/signin");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f1f5f1]">
        <p className="text-sm text-gray-500">
          Loading your profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f5f1] px-4 py-10 font-sans text-[#202820]">
      <div className="mx-auto w-full max-w-135">
        {/* Page heading */}
        <div className="mb-4">
          <h1 className="text-lg font-bold">আমার প্রোফাইল</h1>
          <p className="mt-1 text-xs text-[#7b827b]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User information */}
        <section className="flex items-center justify-between gap-3 rounded-xl border border-[#e2e9e2] bg-[#fafcf9] p-4">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              <Image
                width={48}
                height={48}
                src={user.image}
                alt={user.name || "Profile"}
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6f3e9] text-green-700">
                <FaUser size={20} />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold">
                {user.name || "User"}
              </h2>
              <p className="truncate text-xs text-[#7b827b]">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex shrink-0 items-center gap-1 rounded-md border border-red-400 px-2.5 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
          >
            <FaArrowLeft size={10} />
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </section>

        {/* Edit profile */}
        <section className="mt-4 rounded-xl border border-[#e2e9e2] bg-[#fafcf9] p-4 sm:p-5">
          <h2 className="mb-5 text-sm font-semibold">তথ্য</h2>

          <form onSubmit={handleUpdate} className="space-y-3">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-1.5 block text-xs font-medium"
              >
                নাম
              </label>

              <input
                id="profile-name"
                name="name"
                type="text"
                value={displayName}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                maxLength={100}
                required
                className="h-8 w-full rounded-md border border-[#e3e9e3] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={
                isUpdating ||
                displayName.trim() === (user.name ?? "")
              }
              className="h-8 w-full rounded-md bg-[#07883f] text-xs font-semibold text-white shadow-[0_2px_2px_rgba(0,0,0,0.2)] transition hover:bg-[#067737] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>

        {/* Back to home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-[#8a918a] transition hover:text-[#07883f]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
