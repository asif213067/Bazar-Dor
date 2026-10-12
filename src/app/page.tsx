import Hero from "@/components/Hero";
import AllProducts from "@/components/home/AllProducts";
import PriceChanges from "@/components/home/PriceChanges";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />

      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <PriceChanges />
        <AllProducts />
      </section>

      {/* Other homepage sections */}
    </main>
  );

}
