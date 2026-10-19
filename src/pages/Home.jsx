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
    ...(categoriesData?.map((c) => ({
      id: c.slug,
      label: c.label,
    })) ?? []),
  ];

  const filterBrands = [
    { id: "all", label: "All Brands" },
    ...(brandsData?.map((b) => ({
      id: b.name,
      label: b.name,
    })) ?? []),
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
    <main>
      {/* Premium hero */}
      <section className="relative isolate overflow-hidden bg-sb-charcoal text-sb-cream">
        <div className="absolute inset-0 -z-20">
          <img
            src={env.heroImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sb-charcoal via-sb-charcoal/95 to-sb-charcoal/65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-sb-charcoal/70 via-transparent to-sb-charcoal/20" />

        <div className="section-container">
          <div className="grid min-h-[420px] items-center gap-8 py-10 sm:min-h-[460px] sm:py-12 lg:min-h-[480px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-14">
            <div className="max-w-2xl">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-sb-gold" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sb-gold sm:text-xs">
                  {env.siteSubtitle}
                </p>
              </div>

              <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-sb-cream sm:text-5xl lg:text-6xl xl:text-7xl">
                {env.siteTitle}
                <span className="mt-2 block italic text-sb-gold">
                  {env.siteTagline}
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-7 text-sb-cream/70 sm:text-base sm:leading-8">
                Born in the barber's chair, made for your everyday routine.
                Discover professional grooming essentials selected to help you
                look sharp and feel confident, wherever the day takes you.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#products"
                  className="btn-primary min-h-12 w-full px-7 sm:w-auto"
                >
                  Shop the Collection
                  <span aria-hidden="true" className="ml-3 text-lg">
                    →
                  </span>
                </a>

                <a
                  href="#categories"
                  className="inline-flex min-h-12 w-full items-center justify-center border border-sb-cream/25 px-7 text-sm font-medium text-sb-cream transition-colors duration-300 hover:border-sb-gold hover:text-sb-gold sm:w-auto"
                >
                  Explore Categories
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-sb-cream/15 pt-6">
                <div>
                  <p className="font-display text-xl text-sb-gold">01</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-sb-cream/55">
                    Professional Care
                  </p>
                </div>

                <span className="hidden h-9 w-px bg-sb-cream/15 sm:block" />

                <div>
                  <p className="font-display text-xl text-sb-gold">02</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-sb-cream/55">
                    Everyday Essentials
                  </p>
                </div>

                <span className="hidden h-9 w-px bg-sb-cream/15 sm:block" />

                <div>
                  <p className="font-display text-xl text-sb-gold">03</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-sb-cream/55">
                    Refined Grooming
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-8 block w-full max-w-sm sm:max-w-md lg:mt-0 lg:block">
              <div className="absolute -inset-5 border border-sb-gold/25" />

              <div className="relative aspect-[4/5] overflow-hidden bg-sb-brown">
                <img
                  src={env.heroImage}
                  alt={`${env.siteTitle} grooming collection`}
                  className="h-full w-full object-cover opacity-90"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-sb-charcoal/90 via-transparent to-sb-charcoal/10" />

                <div className="absolute bottom-0 left-0 right-0 p-7 xl:p-9">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sb-gold">
                    The Grooming Edit
                  </p>

                  <p className="mt-3 max-w-xs font-display text-3xl leading-tight text-sb-cream xl:text-4xl">
                    Your routine.
                    <span className="block italic text-sb-gold">
                      Refined.
                    </span>
                  </p>

                  <a
                    href="#products"
                    className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-sb-cream transition-colors hover:text-sb-gold"
                  >
                    Discover the collection
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 hidden h-28 w-28 items-center justify-center rounded-full border border-sb-gold/40 bg-sb-charcoal text-center sm:flex">
                <div>
                  <p className="font-display text-2xl italic text-sb-gold">
                    SB
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-sb-cream/70">
                    Since the Chair
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category collection */}
      <CategoryShowcase
        categories={categoriesData}
        onCategorySelect={handleCategorySelect}
      />

      {/* Products */}
      <section
        id="products"
        className="scroll-mt-24 bg-sb-cream py-16 sm:py-20 lg:py-24"
      >
        <div className="section-container">
          <div className="flex flex-col gap-5 border-b border-sb-brown/15 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-sb-gold" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sb-gold sm:text-xs">
                  From the Barbershop
                </p>
              </div>

              <h2 className="font-display text-4xl font-medium tracking-tight text-sb-charcoal sm:text-5xl lg:text-6xl">
                The Collection
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-sb-brown/70 sm:text-base">
                Professional grooming essentials, thoughtfully selected for
                your daily routine.
              </p>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.14em] text-sb-brown/60">
              {totalCount} {totalCount === 1 ? "Product" : "Products"}
            </p>
          </div>

          <div className="py-8 sm:py-10">
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
            <div className="flex justify-center py-20">
              <div
                role="status"
                aria-label="Loading products"
                className="h-9 w-9 animate-spin rounded-full border-2 border-sb-gold/30 border-t-sb-gold"
              />
            </div>
          ) : isError ? (
            <div className="border border-red-200 bg-white px-5 py-12 text-center">
              <p className="text-base font-medium text-red-700">
                We couldn't load the collection.
              </p>
              <p className="mt-2 text-sm text-sb-brown/60">
                Please check your connection and try again.
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
        </div>
      </section>
    </main>
  );
}