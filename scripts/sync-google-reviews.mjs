/**
 * Optional Official Google Places API (New) Review Sync Script
 * Free-tier friendly & ToS-compliant (no brittle HTML scraping).
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=your_key node scripts/sync-google-reviews.mjs
 */
import fs from "node:fs";
import path from "node:path";

const PLACE_ID = "ChIJ7caUJOT7aS4RSba3n1lmaa8"; // Verified SMALL GAPS BSD Place ID
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
  console.error(
    "Missing GOOGLE_PLACES_API_KEY. Set it in your environment to sync live Google reviews."
  );
  process.exit(1);
}

async function syncReviews() {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount,reviews`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
  });

  if (!res.ok) {
    throw new Error(`Google Places API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const outPath = path.resolve("src/lib/config/reviewsSnapshot.json");
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        averageRating: data.rating ?? 5.0,
        totalReviews: data.userRatingCount ?? 271,
        lastSynced: new Date().toISOString().slice(0, 10),
        reviews: (data.reviews ?? []).map((r, idx) => ({
          id: `google-${idx + 1}`,
          rating: r.rating ?? 5,
          author: r.authorAttribution?.displayName ?? "Google Guest",
          date: r.publishTime ? r.publishTime.slice(0, 10) : "",
          quote: r.text?.text ?? "",
        })),
      },
      null,
      2
    )
  );
  console.log(`Synced reviews snapshot to ${outPath}`);
}

syncReviews().catch((err) => {
  console.error(err);
  process.exit(1);
});
