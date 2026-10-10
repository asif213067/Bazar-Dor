import { NavItem } from "@/type/navItems.type";
import Link from "next/link";


const getNavItems = async (): Promise<NavItem[]> => {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    return Array.isArray(data) ? data : (data.data ?? []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const NavLinks = async () => {
  const navItems = await getNavItems();

  return (
    <nav className="flex h-10 items-center gap-1 overflow-x-auto border-t border-gray-100 px-1 sm:gap-3 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={`/products?category=${encodeURIComponent(item.slug)}`}
          className="group flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-700"
        >
          <span className="text-base transition-transform duration-200 group-hover:scale-110">
            {item.icon}
          </span>

          <span>{item.nameBn}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
