import { PriceItem } from "@/type/priceItems.type";
import Link from "next/link";
import { notFound } from "next/navigation";
export const instant = false;

const getProductBySlug = async (slug: string): Promise<PriceItem | null> => {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    const products: unknown = Array.isArray(data) ? data : data.data;

    if (!Array.isArray(products)) {
      return null;
    }

    return (
      (products as PriceItem[]).find((product) => product.slug === slug) ?? null
    );
  } catch {
    return null;
  }
};

const formatPrice = (price: number) => `${price.toLocaleString("bn-BD")} টাকা`;

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : null;

  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : null;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0,
        ) / markets.length,
      )
    : null;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-5 sm:px-5">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 text-[11px] text-[#68736b]"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>/</span>
          <span className="truncate text-[#263128]">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="flex items-center justify-between gap-3 rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-extrabold text-[#263128] sm:text-xl">
                {product.nameBn}
              </h1>

              <p className="mt-0.5 text-[11px] text-[#737b74]">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} ·{" "}
                {product.categoryNameBn}
              </p>

              <p className="mt-1 text-[10px] text-[#737b74]">
                {markets.length}টি বাজারের তথ্য
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-3 py-2.5 text-center">
            <p className="text-[10px] text-[#737b74]">আজকের দাম</p>
            <p className="text-xl font-extrabold text-[#263128]">
              {product.today.toLocaleString("bn-BD")}
            </p>
            <p className="text-[10px] text-[#737b74]">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>

            <p
              className={`mt-1 text-[10px] font-bold ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {product.change.pct.toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-3 rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-3 sm:p-4">
          <h2 className="mb-3 text-sm font-bold text-[#263128]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <SummaryCard
              label="সর্বনিম্ন দাম"
              value={lowestPrice}
              color="text-green-700"
            />
            <SummaryCard
              label="গড় বাজারদর"
              value={averagePrice}
              color="text-red-500"
            />
            <SummaryCard
              label="সর্বোচ্চ দাম"
              value={highestPrice}
              color="text-green-700"
            />
          </div>
        </section>

        {/* Market Prices Table */}
        <section className="mt-3 rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-3 sm:p-4">
          <h2 className="mb-3 text-sm font-bold text-[#263128]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-[#e6ece6]">
              <table className="w-full min-w-135 border-collapse text-left text-xs">
                <thead className="bg-[#f7faf7] text-[#68736b]">
                  <tr>
                    <th className="px-3 py-3 font-medium">বাজার</th>
                    <th className="px-3 py-3 font-medium">বিভাগ</th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বোচ্চ
                    </th>
                    <th className="px-3 py-3 text-right font-medium">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const average = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-[#e0e8e1] even:bg-[#f0f5f0]/70"
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-[#263128]">
                          {market.market}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-[#68736b]">
                          {market.division}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right">
                          {formatPrice(market.min)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right">
                          {formatPrice(market.max)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                          {formatPrice(Math.round(average))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-lg bg-[#f0f5f0] px-4 py-6 text-center text-xs text-[#68736b]">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

interface SummaryCardProps {
  label: string;
  value: number | null;
  color: string;
}

function SummaryCard({ label, value, color }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-[#e5ebe5] p-3">
      <p className="text-[11px] text-[#68736b]">{label}</p>
      <p className={`mt-1 text-base font-extrabold ${color}`}>
        {value === null ? "তথ্য নেই" : `${value.toLocaleString("bn-BD")} টাকা`}
      </p>
      <p className="mt-1 text-[10px] text-[#737b74]">
        প্রতি কেজি, যেখানে প্রযোজ্য
      </p>
    </div>
  );
}

export default ProductDetailsPage;
