import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import { fetchCategories, fetchBrands } from "../api/metaApi";
import env from "../config/env";
import ProductFilters from "../components/products/ProductFilters";
import CategoryShowcase from "../components/products/CategoryShowcase";
import ProductGrid from "../components/products/ProductGrid";
import InfiniteScrollSentinel from "../components/common/InfiniteScrollSentinel";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const filterCategories = [
    { id: "all", label: "All" },
    ...(categoriesData?.map((c) => ({ id: c.slug, label: c.label })) ?? []),
  ];
  const filterBrands = [
    { id: "all", label: "All Brands" },
    ...(brandsData?.map((b) => ({ id: b.name, label: b.name })) ?? []),
  ];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["products", search, activeCategory, activeBrand],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({
        page: pageParam,
        limit: 12,
        search,
        category: activeCategory,
        brand: activeBrand,
      }),
    getNextPageParam: (last) =>
      last.pagination.hasMore ? last.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });

  const products = data?.pages.flatMap((p) => p.products) ?? [];
  const totalCount = data?.pages[0]?.pagination?.total ?? products.length;

  const clearAllFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setActiveBrand("all");
  };

  const handleCategorySelect = (categorySlug) => {
  setActiveCategory(categorySlug);

  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <>
      <section className="relative overflow-hidden bg-sb-charcoal">
  {/* Logo watermark */}
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center translate-y-8 lg:translate-y-10">
    <img
      src={env.heroImage}
      alt=""
      className="h-[100%] w-[100%] scale-125 object-contain opacity-[0.07] sm:scale-125 lg:scale-160"
    />
  </div>

  {/* Subtle overlay */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sb-charcoal/10 via-transparent to-sb-charcoal/30" />

  {/* Content */}
  <div className="relative mx-auto w-full px-3 sm:px-4 lg:px-6">
    <div className="flex min-h-[500px] items-center justify-center py-14 sm:min-h-[540px] sm:py-16 lg:min-h-[560px] lg:py-20">
      <div className="max-w-3xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-sb-gold" />

          <p className="text-xs font-semibold tracking-[0.25em] text-sb-gold uppercase sm:text-sm">
            {env.siteSubtitle}
          </p>

          <span className="h-px w-8 bg-sb-gold" />
        </div>

        <h1 className="font-display text-4xl font-bold leading-tight text-sb-cream sm:text-5xl lg:text-6xl xl:text-7xl">
          {env.siteTitle}
        </h1>

        <p className="mt-4 font-display text-xl text-sb-gold sm:text-2xl">
          {env.siteTagline}
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-sb-cream/65 sm:text-base sm:leading-8">
          Born in the chair at {env.siteTitle} Barbershop, our {env.siteSubtitle}
          line brings professional-grade shampoos, waxes, creams, and keratin
          treatments straight from the shop to your home.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#products"
            className="btn-primary w-full sm:w-auto"
          >
            Shop Collection
          </a>

          <a
            href="#categories"
            className="inline-flex w-full items-center justify-center rounded-lg border border-sb-cream/20 px-6 py-3 text-sm font-semibold text-sb-cream transition-colors hover:border-sb-gold hover:text-sb-gold sm:w-auto"
          >
            Explore Categories
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<CategoryShowcase
  categories={categoriesData}
  onCategorySelect={handleCategorySelect}
/>

      <section id="products" className="section-container py-14 sm:py-16 lg:py-20">
  <div className="mx-auto max-w-2xl text-center">
    <p className="text-xs font-semibold tracking-[0.25em] text-sb-gold uppercase">
      From the Barbershop
    </p>

    <h2 className="mt-3 font-display text-3xl font-bold text-sb-charcoal sm:text-4xl lg:text-5xl">
      Our Products
    </h2>

    <p className="mt-4 text-sm leading-6 text-sb-brown/70 sm:text-base">
      Professional grooming essentials selected for your everyday routine.
    </p>
  </div>

  <div className="mt-10 sm:mt-12">
        <ProductFilters
          search={search}
          onSearchChange={setSearch}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeBrand={activeBrand}
          onBrandChange={setActiveBrand}
          onClearAll={clearAllFilters}
          resultCount={totalCount}
          categories={filterCategories}
          brands={filterBrands}
        />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sb-gold border-t-transparent" />
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <p className="text-lg text-red-600">
              Failed to load products. Is the backend running?
            </p>
            <p className="mt-2 text-sm text-sb-brown/60">
              Start the API with: cd bec && npm run dev
            </p>
          </div>
        ) : (
          <>
            <ProductGrid
              products={products}
              hasActiveFilters={
                search !== "" ||
                activeCategory !== "all" ||
                activeBrand !== "all"
              }
            />
            <InfiniteScrollSentinel
              onLoadMore={fetchNextPage}
              hasMore={hasNextPage}
              isLoading={isFetchingNextPage}
            />
          </>
        )}
      </section>
    </>
  );
}
