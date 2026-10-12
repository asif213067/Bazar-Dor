import { PriceItem } from "@/type/priceItems.type";
import ProductPriceCard from "./ProductPriceCard";

interface PriceChangeSectionProps {
  title: string;
  direction: "up" | "down";
  products: PriceItem[];
}

const PriceChangeSection = ({
  title,
  direction,
  products,
}: PriceChangeSectionProps) => {
  const isUp = direction === "up";

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`text-sm font-bold ${
            isUp ? "text-red-500" : "text-green-600"
          }`}
          aria-hidden="true"
        >
          {isUp ? "▲" : "▼"}
        </span>

        <h2 className="text-base font-extrabold tracking-tight text-[#263128]">
          {title}
        </h2>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductPriceCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#dfe8df] bg-[#fbfdfb] px-4 py-6 text-center">
          <p className="text-sm text-gray-500">
            {isUp ? "আজ কোনো পণ্যের দাম বাড়েনি।" : "আজ কোনো পণ্যের দাম কমেনি।"}
          </p>
        </div>
      )}
    </section>
  );
};

export default PriceChangeSection;
