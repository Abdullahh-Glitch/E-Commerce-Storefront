import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../api/productApi";
import { addToCart } from "../store/cartSlice";
import ProductCard from "../components/products/ProductCard";
import ProductReviews from "../components/products/ProductReviews";

const categoryLabels = {
  shampoos: "Shampoo",
  waxes: "Wax",
  creams: "Cream",
  keratins: "Keratin",
};

function formatPrice(price) {
  const amount = Number(price);

  return Number.isFinite(amount)
    ? `Rs ${amount.toLocaleString("en-PK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "Price unavailable";
}

function DetailRow({ label, value }) {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1 border-b border-sb-brown/10 py-3 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="shrink-0 text-xs font-semibold text-sb-brown/60">
        {label}
      </span>

      <span className="text-sm leading-6 text-sb-charcoal sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const { data: relatedData } = useQuery({
    queryKey: ["related", product?.category, id],
    queryFn: () => fetchProducts({ category: product.category, limit: 4 }),
    enabled: !!product?.category,
  });

  const related =
    relatedData?.products?.filter((item) => item.id !== id).slice(0, 3) ?? [];

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
    setActiveImage("");
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!added) return undefined;

    const timeoutId = setTimeout(() => setAdded(false), 2000);

    return () => clearTimeout(timeoutId);
  }, [added]);

  useEffect(() => {
    if (product?.image) {
      setActiveImage(product.image);
    }
  }, [product?.image]);

  if (isLoading) {
    return (
      <main className="min-h-[60vh] px-5 py-24 sm:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-sb-gold border-t-transparent" />

          <p className="text-xs font-semibold tracking-[0.18em] text-sb-brown/60 uppercase">
            Loading product
          </p>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-sb-gold-dark uppercase">
          Product unavailable
        </p>

        <h1 className="mt-3 font-display text-3xl font-semibold text-sb-charcoal sm:text-4xl">
          We couldn't find this product
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-sb-brown/70">
          The product may have been removed or the link may no longer be valid.
        </p>

        <Link to="/" className="btn-primary mt-7 inline-flex">
          Back to Shop
        </Link>
      </main>
    );
  }

  const categoryLabel = categoryLabels[product.category];
  const hasImage = Boolean(activeImage);
  const price = Number(product.price);
  const hasPrice = Number.isFinite(price);
  const brand =
    typeof product.brand === "string" ? product.brand : product.brand?.name;

  const handleAddToCart = () => {
    if (!product.inStock || !hasPrice) return;

    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price,
        image: product.image,
        quantity,
      }),
    );

    setAdded(true);
  };

  const handleBuyNow = () => {
    if (!product.inStock || !hasPrice) return;

    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price,
        image: product.image,
        quantity,
      }),
    );

    navigate("/cart");
  };

  return (
    <main className="w-full px-4 py-5 sm:px-7 sm:py-8 lg:px-10 lg:py-10 xl:px-14 2xl:px-20">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 overflow-hidden text-[11px] sm:mb-8 sm:text-xs"
      >
        <Link
          to="/"
          className="shrink-0 text-sb-brown/60 transition-colors hover:text-sb-gold-dark"
        >
          Shop
        </Link>

        <span className="text-sb-brown/30">/</span>

        <span className="truncate text-sb-charcoal">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <section className="grid items-stretch gap-7 lg:grid-cols-2 lg:gap-10 xl:gap-16">
        {/* Product Gallery */}
        <div className="flex min-w-0 flex-col">
          <div className="relative min-h-[360px] flex-1 overflow-hidden border border-sb-brown/10 bg-sb-cream/50 sm:min-h-[460px] lg:min-h-0">
            <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
              {categoryLabel && (
                <span className="bg-sb-charcoal px-3 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-sb-gold uppercase">
                  {categoryLabel}
                </span>
              )}

              {!product.inStock && (
                <span className="bg-white px-3 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-red-700 uppercase">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8 lg:p-10">
              {hasImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                  <span className="font-display text-5xl text-sb-gold/60">
                    {product.name?.charAt(0) || "P"}
                  </span>

                  <p className="text-xs text-sb-brown/50">
                    Product image unavailable
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Product Thumbnail */}
          {product.image && (
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveImage(product.image)}
                aria-label="View main product image"
                aria-pressed={activeImage === product.image}
                className={`h-16 w-16 shrink-0 overflow-hidden border bg-white p-1 transition-colors sm:h-20 sm:w-20 ${
                  activeImage === product.image
                    ? "border-sb-gold"
                    : "border-sb-brown/15 hover:border-sb-gold/60"
                }`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} thumbnail`}
                  className="h-full w-full object-contain"
                />
              </button>

              <p className="text-[10px] leading-5 text-sb-brown/50">
                Product image
              </p>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex min-w-0 flex-col">
          {/* Product Heading */}
          <div className="border-b border-sb-brown/10 pb-5">
            {brand && (
              <p className="text-[10px] font-bold tracking-[0.2em] text-sb-gold-dark uppercase sm:text-xs">
                {brand.name}
              </p>
            )}

            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-sb-charcoal sm:text-4xl lg:text-[2.7rem]">
              {product.name}
            </h1>

            {product.size && (
              <p className="mt-2 text-sm text-sb-brown/60">{product.size}</p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="font-display text-2xl font-semibold text-sb-charcoal sm:text-3xl">
                {formatPrice(product.price)}
              </p>

              {product.inStock ? (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  In stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-red-700">
                  <span className="h-2 w-2 rounded-full bg-red-600" />
                  Currently unavailable
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="py-5">
            <h2 className="text-[11px] font-bold tracking-[0.16em] text-sb-charcoal uppercase">
              About this product
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-sb-brown/75">
              {product.description || "Product description coming soon."}
            </p>
          </div>

          {/* Premium Purchase Panel */}
          <div className="mt-1 border border-sb-brown/15 bg-sb-cream/50 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-sb-brown/15 pb-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-sb-gold-dark uppercase">
                  Your selection
                </p>

                <h2 className="mt-1.5 font-display text-xl font-semibold text-sb-charcoal sm:text-2xl">
                  Make It Yours
                </h2>

                <p className="mt-1 text-xs leading-5 text-sb-brown/60">
                  Choose your quantity and get ready to order.
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[9px] font-semibold tracking-[0.12em] text-sb-brown/50 uppercase">
                  Unit price
                </p>

                <p className="mt-1 text-sm font-semibold text-sb-charcoal">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-5">
              <label className="mb-2 block text-[10px] font-bold tracking-[0.12em] text-sb-charcoal uppercase">
                Quantity
              </label>

              <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-3">
                <div className="flex h-12 items-center justify-between border border-sb-brown/15 bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    disabled={quantity <= 1 || !product.inStock}
                    className="flex h-full w-8 shrink-0 items-center justify-center text-lg text-sb-charcoal transition-colors hover:bg-sb-cream disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span
                    aria-live="polite"
                    className="min-w-0 text-sm font-semibold tabular-nums text-sb-charcoal"
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    disabled={!product.inStock}
                    className="flex h-full w-8 shrink-0 items-center justify-center text-lg text-sb-charcoal transition-colors hover:bg-sb-cream disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !hasPrice}
                  className="flex h-12 min-w-0 items-center justify-center whitespace-nowrap bg-sb-charcoal px-3 text-[10px] font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-sb-brown sm:px-5 sm:tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {added ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="mt-5 flex items-center justify-between border-t border-sb-brown/15 pt-4">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.1em] text-sb-brown/60 uppercase">
                  Order subtotal
                </p>

                <p className="mt-1 text-xs text-sb-brown/50">
                  {quantity} {quantity === 1 ? "item" : "items"}
                </p>
              </div>

              <p className="font-display text-xl font-semibold text-sb-charcoal">
                {hasPrice ? formatPrice(price * quantity) : "—"}
              </p>
            </div>

            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!product.inStock || !hasPrice}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-sb-gold px-5 text-[10px] font-bold tracking-[0.14em] text-sb-charcoal uppercase transition-colors hover:bg-sb-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
              <span aria-hidden="true">→</span>
            </button>

            <p className="mt-3 text-center text-[10px] leading-5 text-sb-brown/55">
              Final delivery charges are calculated during checkout.
            </p>
          </div>

          {/* Product Details */}
          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold text-sb-charcoal">
              Product Information
            </h2>

            <div className="mt-2">
              <DetailRow label="Product" value={product.name} />
              <DetailRow label="Brand" value={brand} />
              <DetailRow label="Size" value={product.size} />
              <DetailRow label="Category" value={categoryLabel} />
              <DetailRow
                label="Availability"
                value={product.inStock ? "In stock" : "Out of stock"}
              />
            </div>
          </div>

          {/* Ingredients */}
          {product.ingredients && (
            <details className="mt-4 border-t border-sb-brown/10 py-4">
              <summary className="cursor-pointer list-none text-[11px] font-bold tracking-[0.14em] text-sb-charcoal uppercase">
                <span className="flex items-center justify-between gap-3">
                  Ingredients
                  <span className="text-lg font-normal text-sb-gold">+</span>
                </span>
              </summary>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-sb-brown/70">
                {product.ingredients}
              </p>
            </details>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="mt-14 border-t border-sb-brown/10 pt-10 sm:mt-20 sm:pt-14">
        <ProductReviews productId={product.id} />
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-14 border-t border-sb-brown/10 pt-10 sm:mt-20 sm:pt-14">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-sb-gold-dark uppercase">
                Selected for you
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold text-sb-charcoal sm:text-3xl">
                You May Also Like
              </h2>
            </div>

            <Link
              to="/"
              className="text-[10px] font-bold tracking-[0.14em] text-sb-charcoal uppercase transition-colors hover:text-sb-gold-dark"
            >
              Explore all products →
            </Link>
          </div>

          <div
            className={`grid grid-cols-2 gap-3 sm:gap-5 ${
              related.length === 1
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : related.length === 2
                  ? "lg:grid-cols-2"
                  : "lg:grid-cols-3 xl:grid-cols-3"
            }`}
          >
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
