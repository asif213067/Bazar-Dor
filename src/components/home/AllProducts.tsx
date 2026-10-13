"use client";

import { useEffect, useMemo, useState } from "react";
import type { PriceItem } from "@/type/priceItems.type";
import type { SortOption } from "@/type/sort.type";
import ProductPriceCard from "./ProductPriceCard";
import SortControl from "@/components/SortControl";

const API_URL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/bazardor/products`;

export default function AllProducts() {
  const [products, setProducts] = useState<PriceItem[]>([]);
  const [sort, setSort] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function getAllProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: unknown = await response.json();

        let result: unknown;

        if (Array.isArray(data)) {
          result = data;
        } else if (
          data !== null &&
          typeof data === "object" &&
          "data" in data
        ) {
          result = data.data;
        } else {
          result = [];
        }

        if (!Array.isArray(result)) {
          result = [];
        }

        if (!cancelled) {
          setProducts(result as PriceItem[]);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void getAllProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sort === "low") {
      items.sort((a, b) => a.today - b.today);
    } else if (sort === "high") {
      items.sort((a, b) => b.today - a.today);
    }

    return items;
  }, [products, sort]);

  return (
    <section id="all-products" className="mt-8 scroll-mt-6">
      {/* Section heading */}
      <div>
        <h2 className="text-base font-extrabold tracking-tight text-[#263128]">
          সব পণ্য
        </h2>
      </div>

      {/* Product count and sorting on the same line */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="min-w-0 text-xs text-[#737b74]">
          {loading
            ? "পণ্যের তথ্য লোড হচ্ছে..."
            : products.length === 0
              ? "পণ্যের তথ্য পাওয়া যাচ্ছে না।"
              : `মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
        </p>

        <SortControl value={sort} onChange={setSort} />
      </div>

      {/* Product cards */}
      {loading ? (
        <div className="py-8 text-center text-sm text-[#737b74]">
          পণ্যের তথ্য লোড হচ্ছে...
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductPriceCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] px-4 py-8 text-center">
          <p className="text-sm text-gray-500">
            পণ্যের তথ্য এই মুহূর্তে পাওয়া যাচ্ছে না।
          </p>
        </div>
      )}
    </section>
  );
}
