import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../api/productApi";
import { addToCart } from "../store/cartSlice";
import ProductCard from "../components/products/ProductCard";

const categoryLabels = {
  shampoos: "Shampoo",
  waxes: "Wax",
  creams: "Cream",
  keratins: "Keratin",
};

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
    relatedData?.products?.filter((p) => p.id !== id).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sb-gold border-t-transparent" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="section-container py-20 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-sb-gold uppercase">
          Something went wrong
        </p>

        <h1 className="mt-3 font-display text-3xl font-bold text-sb-charcoal">
          Product Not Found
        </h1>

        <Link to="/" className="btn-primary mt-8 inline-flex">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;

    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      }),
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="section-container py-6 sm:py-8 lg:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 overflow-hidden text-xs sm:mb-8 sm:text-sm">
        <Link
          to="/"
          className="shrink-0 text-sb-brown/50 transition-colors hover:text-sb-gold"
        >
          Shop
        </Link>

        <span className="shrink-0 text-sb-brown/30">/</span>

        <span className="truncate text-sb-charcoal">{product.name}</span>
      </nav>

      {/* Product */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10 xl:gap-12">
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl border border-sb-brown/10 bg-white">
          <div className="aspect-square max-w-[560px] bg-sb-cream lg:mx-auto">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="lg:pt-1">
          {/* Category */}
          {categoryLabels[product.category] && (
            <span className="inline-flex rounded-full bg-sb-charcoal px-3 py-1 text-[10px] font-semibold tracking-wider text-sb-gold uppercase">
              {categoryLabels[product.category]}
            </span>
          )}

          {/* Brand */}
          <p className="mt-3 text-xs font-semibold tracking-wider text-sb-gold uppercase sm:text-sm">
            {product.brand}
          </p>

          {/* Name */}
          <h1 className="mt-1.5 font-display text-2xl font-bold leading-tight text-sb-charcoal sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-2xl font-bold text-sb-charcoal">
              Rs {product.price.toFixed(2)}
            </p>

            <p className="text-sm text-sb-brown/50">{product.size}</p>
          </div>

          <div className="my-5 h-px bg-sb-brown/10" />

          {/* Description */}
          <div>
            <h2 className="font-display text-base font-semibold text-sb-charcoal sm:text-lg">
              Product Details
            </h2>

            <p className="mt-2 text-sm leading-6 text-sb-brown/70">
              {product.description}
            </p>
          </div>

          {/* Ingredients */}
          <div className="mt-5 rounded-lg border border-sb-brown/10 bg-sb-cream/40 p-4">
            <h3 className="text-xs font-semibold tracking-wider text-sb-charcoal uppercase">
              Ingredients
            </h3>

            <p className="mt-2 text-sm leading-6 text-sb-brown/70">
              {product.ingredients}
            </p>
          </div>

          {/* Stock */}
          <div className="mt-5 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                product.inStock ? "bg-green-500" : "bg-red-500"
              }`}
            />

            <span
              className={`text-xs font-semibold ${
                product.inStock ? "text-green-700" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Currently Unavailable"}
            </span>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-11 w-full items-center justify-between rounded-lg border border-sb-brown/10 bg-white sm:w-auto">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-full w-11 items-center justify-center text-lg text-sb-brown transition-colors hover:bg-sb-cream hover:text-sb-charcoal"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="min-w-9 text-center text-sm font-semibold text-sb-charcoal">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-full w-11 items-center justify-center text-lg text-sb-brown transition-colors hover:bg-sb-cream hover:text-sb-charcoal"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn-primary h-11 flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {added
                ? "Added to Cart!"
                : product.inStock
                  ? "Add to Cart"
                  : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-sb-brown/10 pt-12 sm:mt-20 sm:pt-14">
          <div className="mb-7 text-center sm:mb-9">
            <p className="text-xs font-semibold tracking-[0.2em] text-sb-gold uppercase">
              You May Also Like
            </p>

            <h2 className="mt-2 font-display text-2xl font-bold text-sb-charcoal sm:text-3xl">
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
