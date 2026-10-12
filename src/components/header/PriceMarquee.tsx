import { PriceItem } from "@/type/marqueeItems.type";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const getPrices = async (): Promise<PriceItem[]> => {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch market prices");
    }

    const data = await res.json();

    const prices: PriceItem[] = Array.isArray(data) ? data : (data.data ?? []);

    return prices;
  } catch {
    return [];
  }
};

const PriceMarquee = async () => {
  const prices = await getPrices();

  if (prices.length === 0) {
    return (
      <div className="flex h-10 items-center justify-center border-y border-gray-200 bg-[#fbfdfb] px-4">
        <p className="text-xs text-gray-500">বাজারদর এখন পাওয়া যাচ্ছে না।</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-[#fbfdfb]">
      <Marquee
        direction="left"
        speed={100}
        autoFill={false}
        pauseOnHover
        gradient={false}
        className="h-10"
      >
        {prices.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="flex h-10 shrink-0 items-center gap-2 border-r border-gray-200 px-4 text-[11px] transition-colors hover:bg-green-50"
            >
              {/* Product Icon and Name */}
              <span className="text-xs" aria-hidden="true">
                {item.image || item.categoryIcon}
              </span>

              <span className="whitespace-nowrap font-semibold text-gray-700">
                {item.nameBn}
              </span>

              {/* Current Price */}
              <span className="whitespace-nowrap text-gray-600">
                ৳{item.today} টাকা/{item.unit}
              </span>

              {/* Price Change */}
              <span
                className={`flex items-center gap-0.5 whitespace-nowrap text-[10px] font-semibold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}
                {item.change.pct.toFixed(1)}%
              </span>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
};

export default PriceMarquee;
