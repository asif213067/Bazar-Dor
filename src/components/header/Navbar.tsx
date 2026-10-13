import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import NavLinks from "./NavLinks";
import TodayDate from "./TodayDate";
import NavLinksSkeleton from "./NavLinksSkeleton";
import UserInfo from "./UserInfo";

const Navbar = () => {

  return (
    <header className="w-full border-x border-b border-gray-100 bg-[#fbfdfb]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Top Navbar */}
        <div className="flex h-11 items-center justify-between">
          {/* Logo and Branding */}
          <Link href="/" className="flex shrink-0 items-center gap-1.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 shadow-sm">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={26}
                height={26}
                priority
                className="h-5 w-5 object-contain"
              />
            </div>

            <div className="leading-tight">
              <h1 className="text-[18px] font-bold text-gray-800">বাজার দর</h1>
              {/*the Date component*/}
              <TodayDate />
            </div>
          </Link>

          {/* Authentication Buttons */}
          <UserInfo />
        </div>

        {/* Bottom Navigation */}
        <Suspense fallback={<NavLinksSkeleton />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
};

export default Navbar;
