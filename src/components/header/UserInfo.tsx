"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsDropdownOpen(false);
      toast.success("Signed out successfully!");
    } catch {
      toast.error("Sign-out failed. Please try again.");
    }
  };

  // Prevent showing Sign In / Sign Up while checking the session
  if (isPending) {
    return <div className="h-9 w-28 animate-pulse rounded-md bg-gray-100" />;
  }

  // Logged-in user: show profile and dropdown
  if (user) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-gray-100"
        >
          {user.image ? (
            <Image
              width={28}
              height={28}
              src={user?.image}
              alt={user.name || "User profile"}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <span className="max-w-24 truncate text-[13px] font-medium text-gray-700">
            {user.name || "User"}
          </span>

          <FaChevronDown
            className={`text-[10px] text-gray-500 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <>
            {/* Click outside this menu by clicking the toggle button again */}
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
            >
              <div className="border-b border-gray-100 px-4 py-2">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.name || "User"}
                </p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>

              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <FaUser className="text-gray-400" />
                আমার প্রোফাইল
              </Link>

              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <FaSignOutAlt className="text-red-400" />সাইন আউট
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Logged-out user: show Sign In and Sign Up
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/signin"
        className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-gray-700 transition hover:text-green-700"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-md bg-green-600 px-3 py-1.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default UserInfo;
