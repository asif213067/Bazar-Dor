import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#e0e8e1] bg-[#fbfdfb] px-6 py-10 text-center shadow-sm sm:px-10">
        {/* Icon */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#e5f0e6] text-5xl">
          🛒
        </div>

        {/* Error Code */}
        <p className="mt-6 text-sm font-bold tracking-[0.25em] text-green-700">
          ERROR 404
        </p>

        {/* Heading */}
        <h1 className="mt-3 text-2xl font-extrabold text-[#263128] sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#68736b]">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন, সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা
          URL-টি ভুল।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        {/* Footer */}
        <p className="mt-6 text-xs text-[#8a948b]">
          বাজারদর · আপনার নিত্যদিনের বাজারের সঙ্গী
        </p>
      </div>
    </main>
  );
}
