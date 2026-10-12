"use client";

import { useMemo, useState } from "react";
import type { PriceItem } from "@/type/priceItems.type";
import type { SortOption } from "@/type/sort.type";

import SortControl from "@/components/SortControl";
import ProductPriceCard from "./home/ProductPriceCard";

interface ProductListProps {
  products: PriceItem[];
}

export default function ProductList({ products }: ProductListProps) {
  const [sort, setSort] = useState<SortOption>("default");

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
    <section>
      {/* Product count on the left, sorting on the right */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="min-w-0 text-xs text-[#737b74]">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="shrink-0">
          <SortControl value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductPriceCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
