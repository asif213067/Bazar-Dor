
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 sm:px-5">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* App icon and loading message */}
        <section className="flex flex-col items-center justify-center rounded-2xl border border-[#e0e8e1] bg-white px-5 py-8 text-center shadow-sm">
          {/* Icon */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#e5f0e6] text-5xl">
            🛒
          </div>

          <h1 className="mt-4 text-xl font-extrabold text-[#263128]">
            বাজারদর
          </h1>

          <p className="mt-2 text-sm text-[#737b74]">
            আজকের বাজারদর সংগ্রহ করা হচ্ছে...
          </p>

          {/* Animated loading indicator */}
          <div
            className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-[#e0e8e1]"
            role="progressbar"
            aria-label="পণ্য লোড হচ্ছে"
          >
            <div className="h-full w-1/2 animate-pulse rounded-full bg-green-600" />
          </div>

          <p className="mt-3 text-xs text-[#737b74]">
            অনুগ্রহ করে অপেক্ষা করুন
          </p>
        </section>

        {/* Category title skeleton */}
        <div className="flex items-center gap-3 rounded-xl border border-[#e0e8e1] bg-white p-4">
          <div className="size-11 animate-pulse rounded-xl bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-48 max-w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Sort control skeleton */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e0e8e1] bg-white p-4">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-44 max-w-[60%] animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Product card skeletons */}
        <section
          aria-label="পণ্য লোড হচ্ছে"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-[#e0e8e1] bg-white p-4"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-[#e8eee8] text-2xl">
                  🛒
                </div>

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mb-3 h-3 w-1/3 rounded bg-gray-200" />
              <div className="mb-2 h-5 w-1/2 rounded bg-gray-200" />
              <div className="h-3 w-2/5 rounded bg-gray-200" />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
