import Link from "next/link";
import { notFound } from "next/navigation";


import type { PriceItem } from "@/type/priceItems.type";
import ProductList from "@/components/ProductList";

const API_URL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/bazardor/products`;

async function getProducts(): Promise<PriceItem[]> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data: unknown = await res.json();

    if (Array.isArray(data)) {
      return data as PriceItem[];
    }

    if (
      data !== null &&
      typeof data === "object" &&
      "data" in data &&
      Array.isArray(data.data)
    ) {
      return data.data as PriceItem[];
    }

    return [];
  } catch {
    return [];
  }
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category: categorySlug } = await searchParams;
  const allProducts = await getProducts();

  if (
    categorySlug &&
    allProducts.length > 0 &&
    !allProducts.some((product) => product.category === categorySlug)
  ) {
    notFound();
  }

  const products = categorySlug
    ? allProducts.filter((product) => product.category === categorySlug)
    : allProducts;

  const categoryProduct = products[0];

  const categoryName =
    categoryProduct?.categoryNameBn ?? categorySlug ?? "সকল পণ্য";

  const categoryIcon = categoryProduct?.categoryIcon ?? "🛒";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-5 sm:px-5">
      <div className="mx-auto max-w-5xl space-y-4">
        {/* Category header */}
        <section className="flex items-center gap-3 rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-4 sm:p-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-lg font-extrabold text-[#263128]">
              {categoryName}
            </h1>

            <p className="mt-0.5 text-xs text-[#737b74]">
              আজকের বাজারদর দেখুন ও পরিবর্তন তুলনা করুন
            </p>
          </div>
        </section>

        {/* Product count, sorting, and product cards */}
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <section className="flex flex-col items-center rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] px-4 py-10 text-center">
            <span className="text-3xl" aria-hidden="true">
              🛒
            </span>

            <h2 className="mt-3 text-sm font-bold text-[#263128]">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-1 max-w-sm text-xs leading-5 text-[#737b74]">
              এই ক্যাটাগরিতে এখনো কোনো পণ্যের তথ্য নেই। হোম পেজে ফিরে অন্য পণ্য
              দেখতে পারেন।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#263128] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3b4b3d]"
            >
              হোম পেজে ফিরে যান
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
