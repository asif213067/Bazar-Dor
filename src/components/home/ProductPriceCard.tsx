import { PriceItem } from "@/type/priceItems.type";
import Link from "next/link";

interface ProductPriceCardProps {
  product: PriceItem;
}

const ProductPriceCard = ({ product }: ProductPriceCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block rounded-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      aria-label={`${product.nameBn} - বিস্তারিত দেখুন`}
    >
      <article className="h-full rounded-[15px] border border-[#e0e8e1] bg-[#fbfdfb] p-3 transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md">
        {/* Product information */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-[22px]">
            {product.image || product.categoryIcon}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-bold text-[#263128]">
              {product.nameBn}
            </h3>

            <p className="text-[10px] text-[#727a73]">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
          </div>
        </div>

        {/* Price and change */}
        <div className="mt-2.5 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] text-[#737b74]">
              আজকের দাম
            </p>

            <p className="mt-0.5 text-[15px] font-extrabold leading-tight text-[#263128]">
              {product.today.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          <span
            className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
              isUp
                ? "bg-[#f0f5f0] text-red-600"
                : isDown
                  ? "bg-[#edf7ef] text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}

            {product.change.pct.toLocaleString("bn-BD", {
              maximumFractionDigits: 1,
            })}
            %
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProductPriceCard;