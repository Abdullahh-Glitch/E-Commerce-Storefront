
import { useState } from "react";

function Stars({ value = 0, size = "text-base" }) {
  const rating = Number(value) || 0;

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${size}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating)
              ? "text-sb-gold"
              : "text-sb-brown/20"
          }
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  );
}

function RatingInput({ value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-sb-charcoal">
        Your rating
      </p>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`Rate ${star} out of 5 stars`}
            aria-pressed={value === star}
            className={`text-2xl transition-colors ${
              star <= value
                ? "text-sb-gold"
                : "text-sb-brown/25 hover:text-sb-gold/70"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const name = review.name || review.customerName || "Customer";
  const rating = Number(review.rating) || 0;
  const date = review.createdAt || review.date;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <article className="border-b border-sb-brown/10 py-5 last:border-b-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-sb-charcoal">
            {name}
          </h3>

          {formattedDate && (
            <p className="mt-1 text-[10px] text-sb-brown/50">
              {formattedDate}
            </p>
          )}
        </div>

        <Stars value={rating} />
      </div>

      {review.title && (
        <h4 className="mt-3 text-sm font-semibold text-sb-charcoal">
          {review.title}
        </h4>
      )}

      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-sb-brown/70">
        {review.comment || review.text || ""}
      </p>
    </article>
  );
}

export default function ProductReviews({
  productId,
  reviews = [],
  onSubmitReview,
}) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const validReviews = reviews.filter(
    (review) => Number(review.rating) >= 1 && Number(review.rating) <= 5,
  );

  const reviewCount = validReviews.length;

  const averageRating =
    reviewCount > 0
      ? validReviews.reduce(
          (total, review) => total + Number(review.rating),
          0,
        ) / reviewCount
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: validReviews.filter(
      (review) => Number(review.rating) === star,
    ).length,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormMessage("");

    if (!productId || !rating || !name.trim() || !comment.trim()) {
      setFormMessage("Please provide your name, rating, and review.");
      return;
    }

    if (!onSubmitReview) {
      setFormMessage(
        "Review submission will be available once the review service is connected.",
      );
      return;
    }

    try {
      await onSubmitReview({
        productId,
        name: name.trim(),
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });

      setRating(0);
      setName("");
      setTitle("");
      setComment("");
      setFormMessage("Your review was submitted successfully.");
    } catch {
      setFormMessage(
        "We couldn't submit your review. Please try again later.",
      );
    }
  };

  return (
    <div>
      {/* Section Heading */}
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[0.2em] text-sb-gold-dark uppercase">
          Customer feedback
        </p>

        <h2 className="mt-2 font-display text-2xl font-semibold text-sb-charcoal sm:text-3xl">
          Reviews & Ratings
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-sb-brown/65">
          See what customers think about this product and share your own
          experience.
        </p>
      </div>

      {/* Rating Summary */}
      <div className="grid gap-6 border border-sb-brown/10 bg-sb-cream/30 p-5 sm:grid-cols-[0.8fr_1.2fr] sm:items-center sm:p-7">
        <div className="sm:border-r sm:border-sb-brown/10 sm:pr-6">
          {reviewCount > 0 ? (
            <>
              <p className="font-display text-5xl font-semibold text-sb-charcoal">
                {averageRating.toFixed(1)}
                <span className="ml-1 text-base text-sb-brown/50">/ 5</span>
              </p>

              <div className="mt-2">
                <Stars value={averageRating} size="text-lg" />
              </div>

              <p className="mt-2 text-xs text-sb-brown/60">
                Based on {reviewCount}{" "}
                {reviewCount === 1 ? "review" : "reviews"}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl font-semibold text-sb-charcoal">
                No ratings yet
              </p>

              <div className="mt-2">
                <Stars value={0} size="text-lg" />
              </div>

              <p className="mt-2 text-xs leading-5 text-sb-brown/60">
                Be the first to share your experience.
              </p>
            </>
          )}
        </div>

        <div className="space-y-2.5">
          {ratingCounts.map(({ star, count }) => (
            <div
              key={star}
              className="grid grid-cols-[32px_1fr_28px] items-center gap-3"
            >
              <span className="text-xs text-sb-brown/70">
                {star} star
              </span>

              <div
                className="h-2 overflow-hidden bg-sb-brown/10"
                role="progressbar"
                aria-label={`${star}-star reviews`}
                aria-valuemin={0}
                aria-valuemax={reviewCount || 1}
                aria-valuenow={count}
              >
                <div
                  className="h-full bg-sb-gold transition-all"
                  style={{
                    width: `${
                      reviewCount > 0 ? (count / reviewCount) * 100 : 0
                    }%`,
                  }}
                />
              </div>

              <span className="text-right text-xs tabular-nums text-sb-brown/60">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews and Form */}
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Customer Reviews */}
        <div>
          <h3 className="border-b border-sb-brown/10 pb-4 font-display text-xl font-semibold text-sb-charcoal">
            Customer Reviews
          </h3>

          {validReviews.length > 0 ? (
            <div>
              {validReviews.map((review, index) => (
                <ReviewCard
                  key={review.id || review._id || `${productId}-${index}`}
                  review={review}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-52 flex-col items-center justify-center border-b border-sb-brown/10 px-4 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center border border-sb-gold/40 text-2xl text-sb-gold">
                ★
              </div>

              <h4 className="mt-4 font-display text-lg font-semibold text-sb-charcoal">
                No reviews yet
              </h4>

              <p className="mt-2 max-w-sm text-sm leading-6 text-sb-brown/60">
                Customer feedback will appear here once reviews are available.
              </p>
            </div>
          )}
        </div>

        {/* Write a Review */}
        <div className="border border-sb-brown/10 bg-white p-5 sm:p-6">
          <h3 className="font-display text-xl font-semibold text-sb-charcoal">
            Write a Review
          </h3>

          <p className="mt-2 text-xs leading-5 text-sb-brown/60">
            Share your experience to help other customers make an informed
            decision.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <RatingInput value={rating} onChange={setRating} />

            <div>
              <label
                htmlFor={`review-name-${productId}`}
                className="mb-2 block text-xs font-semibold text-sb-charcoal"
              >
                Your name
              </label>

              <input
                id={`review-name-${productId}`}
                type="text"
                autoComplete="name"
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                required
                className="h-11 w-full border border-sb-brown/15 bg-sb-cream/20 px-3 text-sm outline-none transition-colors placeholder:text-sb-brown/35 focus:border-sb-gold"
              />
            </div>

            <div>
              <label
                htmlFor={`review-title-${productId}`}
                className="mb-2 block text-xs font-semibold text-sb-charcoal"
              >
                Review title <span className="font-normal text-sb-brown/45">(optional)</span>
              </label>

              <input
                id={`review-title-${productId}`}
                type="text"
                maxLength={120}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Sum up your experience"
                className="h-11 w-full border border-sb-brown/15 bg-sb-cream/20 px-3 text-sm outline-none transition-colors placeholder:text-sb-brown/35 focus:border-sb-gold"
              />
            </div>

            <div>
              <label
                htmlFor={`review-comment-${productId}`}
                className="mb-2 block text-xs font-semibold text-sb-charcoal"
              >
                Your review
              </label>

              <textarea
                id={`review-comment-${productId}`}
                rows={4}
                maxLength={2000}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="What did you like or dislike?"
                required
                className="w-full resize-y border border-sb-brown/15 bg-sb-cream/20 p-3 text-sm leading-6 outline-none transition-colors placeholder:text-sb-brown/35 focus:border-sb-gold"
              />

              <p className="mt-1 text-right text-[10px] text-sb-brown/45">
                {comment.length}/2000
              </p>
            </div>

            {formMessage && (
              <p
                role="status"
                className="text-xs leading-5 text-sb-brown/70"
              >
                {formMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={!onSubmitReview}
              className="flex h-11 w-full items-center justify-center bg-sb-charcoal px-5 text-[10px] font-bold tracking-[0.14em] text-white uppercase transition-colors hover:bg-sb-brown disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Review
            </button>

            {!onSubmitReview && (
              <p className="text-[10px] leading-5 text-sb-brown/50">
                Review submission will be enabled after the backend review
                endpoint is connected.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
