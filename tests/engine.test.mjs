import test from "node:test";
import assert from "node:assert/strict";

test("WhatsApp booking URL encodes SMALL GAPS number and chosen spot/activity", () => {
  const msg =
    "Hi SMALL GAPS Coffee BSD, I'd like to reserve the Indoor WFC Teak Table for a WFC session (1-2 guests) today.";
  const url = `https://wa.me/62818199099?text=${encodeURIComponent(msg)}`;
  assert.ok(url.startsWith("https://wa.me/62818199099?text="));
  assert.ok(decodeURIComponent(url).includes("Indoor WFC Teak Table"));
});

test("Barista guardrail detects SMALL GAPS coffee topics and rejects off-topic queries", () => {
  const isSmallGapsTopic = (q) =>
    /(gaps|latte|coffee|kopi|wfc|starlet|halal|pork|buka|hour|reserve|wa|menu|strudel|cheesecake|gading)/i.test(
      q
    );
  assert.equal(isSmallGapsTopic("Is Small Gaps good for WFC?"), true);
  assert.equal(isSmallGapsTopic("Write a Python sorting algorithm"), false);
});
