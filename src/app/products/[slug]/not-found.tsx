import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center bg-[#f0f5f0] px-4">
      <div className="text-center">
        <p className="text-4xl">🛒</p>

        <h1 className="mt-4 text-xl font-bold text-[#263128]">
          পণ্যটি পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-[#68736b]">
          পণ্যটি মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
        </p>

        <Link
          href="/#all-products"
          className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
        >
          সব পণ্য দেখুন
        </Link>
      </div>
    </main>
  );
}
