import Image from "next/image";
import TodayDate from "@/components/header/TodayDate";

const Hero = () => {
  return (
    <section className="mt-4 w-full px-1.25">
      {/* Banner */}
      <div className="mx-auto max-w-250 overflow-hidden rounded-[22px] border border-[#dfe8df] bg-[#fbfdfb]">
        <div className="mx-auto flex min-h-59.5 max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          {/* Text Content */}
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-[#e0f2e7] px-3 py-1 text-[11px] font-medium text-green-700">
              <TodayDate />
            </span>

            <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#202b23] sm:text-3xl lg:text-[32px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-122.5 text-xs leading-6 text-[#68736b] sm:text-sm">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, চিনি ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#all-products"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_3px_0_#a7c9b1] transition duration-200 hover:bg-green-800 active:translate-y-0.5 active:shadow-none"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Banner Illustration */}
          <div className="relative hidden h-47.5 w-55 shrink-0 sm:block lg:h-50 lg:w-60">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের তাজা পণ্য"
              fill
              priority
              sizes="(max-width: 1024px) 220px, 240px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

