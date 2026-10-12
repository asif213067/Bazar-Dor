
import { PriceItem } from "@/type/marqueeItems.type";
import PriceChangeSection from "./PriceChangeSection";

const getPrices = async (): Promise<PriceItem[]> => {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    const products: unknown = Array.isArray(data)
      ? data
      : data.data;

    if (!Array.isArray(products)) {
      return [];
    }

    return products as PriceItem[];
  } catch {
    return [];
  }
};

const PriceChanges = async () => {
  const products = await getPrices();

  const decreasedProducts = products
    .filter((product) => product.change?.dir === "down")
    .slice(0, 6);

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .slice(0, 6);

  if (products.length === 0) {
    return (
      <section className="rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] px-4 py-8 text-center">
        <p className="text-sm text-gray-500">
          বাজারদরের তথ্য এই মুহূর্তে পাওয়া যাচ্ছে না।
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      <PriceChangeSection
        title="আজ দাম বেড়েছে"
        direction="up"
        products={increasedProducts}
          />
          
      <PriceChangeSection
        title="আজ দাম কমেছে"
        direction="down"
        products={decreasedProducts}
      />
    </div>
  );
};

export default PriceChanges;

