"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { NavItem } from "@/type/navItems.type";

interface CategoryNavLinkProps {
  item: NavItem;
}

export default function CategoryNavLink({ item }: CategoryNavLinkProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const isActive = selectedCategory === item.slug;

  return (
    <Link
      href={`/products?category=${encodeURIComponent(item.slug)}`}
      aria-current={isActive ? "page" : undefined}
      className={`group flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium transition-all duration-200 ${
        isActive
          ? "bg-green-600 text-white"
          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      <span className="text-base transition-transform duration-200 group-hover:scale-110">
        {item.icon}
      </span>

      <span>{item.nameBn}</span>
    </Link>
  );
}
