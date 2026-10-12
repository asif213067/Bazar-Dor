import { NavItem } from "@/type/navItems.type";
import CategoryNavLink from "./CategoryNavLink";



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
  } catch{
    return [];
  }
};

const NavLinks = async () => {
  const navItems = await getNavItems();

  // Fallback UI when the API fails or returns no categories
  if (navItems.length === 0) {
    return (
      <nav
        aria-label="Product categories"
        className="flex h-10 items-center border-t border-gray-100 px-3"
      >
        <p className="text-xs text-gray-500" role="status">
          ক্যাটাগরি এখন পাওয়া যাচ্ছে না।
        </p>
      </nav>
    );
  }

  return (
    <nav className="flex h-10 items-center gap-1 overflow-x-auto border-t border-gray-100 px-1 sm:gap-3 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {navItems.map((item) => (
        <CategoryNavLink key={item.id} item={item} />
      ))}
    </nav>
  );
};;

export default NavLinks;
