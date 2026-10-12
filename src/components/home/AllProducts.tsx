
import { PriceItem } from "@/type/marqueeItems.type";
import ProductPriceCard from "./ProductPriceCard";

const getAllProducts = async (): Promise<PriceItem[]> => {
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

const AllProducts = async () => {
  const products = await getAllProducts();

  return (
    <section id="all-products" className="scroll-mt-6 mt-8">
      {/* Section Heading */}
      <div className="mb-4">
        <h2 className="text-base font-extrabold tracking-tight text-[#263128]">
          সব পণ্য
        </h2>

        <p className="mt-1 text-[11px] text-[#737b74]">
          {products.length === 0
            ? "পণ্যের তথ্য এই মুহূর্তে পাওয়া যাচ্ছে না।"
            : `মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
        </p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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
};

export default AllProducts;
