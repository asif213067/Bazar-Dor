"use client";

import { useMemo, useState } from "react";
import SortControl from "@/components/SortControl";
import type { PriceItem } from "@/type/priceItems.type";
import type { SortOption } from "@/type/sort.type";
import ProductPriceCard from "@/components/home/ProductPriceCard";

interface SortableProductsProps {
  products: PriceItem[];
}

export default function SortableProducts({ products }: SortableProductsProps) {
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
    <div className="space-y-4">
      {/* Sorting control */}
      <div className="flex justify-end">
        <SortControl value={sort} onChange={setSort} />
      </div>

      {/* Sorted product cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductPriceCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] px-4 py-8 text-center">
          <p className="text-sm text-[#737b74]">কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
}
