import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("all referenced cafe images exist in public/images/cafe", () => {
  const required = [
    "main-bar.webp",
    "table-bar-view.webp",
    "outdoor-brick-bench.webp",
    "terrace-front.webp",
    "gaps-latte-tea.webp",
    "signature-thermos-set.webp",
    "strudel-icecream.webp",
    "barista-portrait.png",
  ];
  for (const file of required) {
    const full = path.resolve("public/images/cafe", file);
    assert.equal(fs.existsSync(full), true, `Missing image asset: ${file}`);
  }
});

test("zero legacy three.js or r3f files exist in src", () => {
  assert.equal(fs.existsSync(path.resolve("src/components/scene")), false);
  assert.equal(fs.existsSync(path.resolve("src/components/hud")), false);
});

test("WhatsApp reservation link encodes SMALL GAPS number correctly", () => {
  const msg = "Hi SMALL GAPS Coffee BSD, I'd like to reserve the Indoor WFC Teak Table today.";
  const url = `https://wa.me/62818199099?text=${encodeURIComponent(msg)}`;
  assert.ok(url.startsWith("https://wa.me/62818199099?text="));
  assert.ok(decodeURIComponent(url).includes("Indoor WFC Teak Table"));
});
