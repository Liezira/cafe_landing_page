import type { UiLanguage } from "@/lib/config/i18n";

export interface BaristaChatMessage {
  id: string;
  sender: "barista" | "guest";
  text: string;
  suggestedMenuId?: string;
}

/**
 * 100% free-tier, warm bilingual (EN / ID) Barista chat engine strictly bounded
 * to verified SMALL GAPS Coffee BSD facts. Politely deflects off-topic queries.
 */
export function getBaristaReply(
  rawInput: string,
  lang: UiLanguage = "en"
): {
  reply: string;
  suggestedMenuId?: string;
} {
  const q = rawInput.toLowerCase().trim();
  const isId = lang === "id";

  if (!q) {
    return {
      reply: isId
        ? "Selamat datang di lantai 2! Tanya apa saja seputar kopi signature, makanan, spot WFC, atau cara reservasi di SMALL GAPS BSD."
        : "Welcome up to the 2nd floor! Feel free to ask me about our signature coffees, comfort food, WFC spots, or how to reserve a table at SMALL GAPS BSD.",
    };
  }

  if (/^(hi|hello|hey|halo|hai|pagi|siang|sore|malam|permisi)\b/.test(q)) {
    return {
      reply: isId
        ? "Halo, selamat datang di SMALL GAPS Coffee BSD! Santai dulu ya. Mau saya rekomendasikan kopi andalan atau spot duduk yang nyaman?"
        : "Hello, welcome to SMALL GAPS Coffee BSD! Take a breath and make yourself at home. Would you like a recommendation for coffee or a cozy seat?",
    };
  }

  if (
    /(best|seller|recommend|signature|andalan|favorit|enak|kopi|coffee|latte|gaps|forbidden|elixavida|caramel|minum|drink)/.test(
      q
    )
  ) {
    if (q.includes("forbidden")) {
      return {
        reply: isId
          ? "Forbidden Fruit itu salah satu Barista Exploration kami dengan rasa buah asli dan espresso halus. Segar banget dan jadi favorit banyak tamu!"
          : "Forbidden Fruit is one of our Barista Explorations made with real fruit notes and smooth espresso. It is bright, refreshing, and super popular here!",
        suggestedMenuId: "forbidden-fruit",
      };
    }
    if (q.includes("elixavida")) {
      return {
        reply: isId
          ? "Elixavida diracik dengan fermentasi lembut bernuansa cokelat, hazelnut, dan rempah hangat, disajikan dalam termos putih khas SMALL GAPS dan bola es kristal."
          : "Elixavida is slow-fermented with warm notes of chocolate, hazelnut, and gentle spices, served in our signature white capsule thermos with a clear ice sphere.",
        suggestedMenuId: "elixavida",
      };
    }
    return {
      reply: isId
        ? "Andalan utama kami adalah Gaps Latte (dirty latte berlapis yang paling nikmat diminum dalam 5 menit di tempat). Tamu juga suka Forbidden Fruit, Elixavida, dan Himalayan Salted Caramel!"
        : "Our signature highlight is the Gaps Latte, a layered dirty latte best enjoyed within 5 minutes right here at the cafe. Guests also love Forbidden Fruit, Elixavida, and Himalayan Salted Caramel!",
      suggestedMenuId: "gaps-latte",
    };
  }

  if (
    /(food|eat|makan|lapar|pastry|cake|cheesecake|strudel|chicken|bihun|toast|cakue|snack|dessert)/.test(
      q
    )
  ) {
    return {
      reply: isId
        ? "Untuk teman ngopi, Blueberry Basque Cheesecake dan Pineapple Apple Strudel dengan es krim vanila wajib dicoba. Kalau mau makan hangat, ada Bihun Sapi Kuah dan Hot-Honey Nashville Chicken!"
        : "For something sweet, our Blueberry Basque Cheesecake and Pineapple Apple Strudel with vanilla ice cream are favorites. If you want a warm meal, try Bihun Sapi Kuah or Hot-Honey Nashville Chicken!",
      suggestedMenuId: "blueberry-basque-cheesecake",
    };
  }

  if (
    /(wfc|work|kerja|laptop|wifi|wi-fi|colokan|outlet|seat|kursi|duduk|outdoor|indoor|terrace|balkon|tempat)/.test(
      q
    )
  ) {
    return {
      reply: isId
        ? "Enak banget buat WFC! Ada meja kayu indoor ber-AC dengan colokan dan Wi-Fi (Elixavida), sofa banquette buat kumpul, plus teras balkon bata terakota di lantai 2."
        : "SMALL GAPS BSD is super cozy for WFC! We have quiet indoor teak tables with power outlets and steady Wi-Fi (network: Elixavida), a cushioned banquette for groups, and a 2nd-floor outdoor brick-bench terrace.",
    };
  }

  if (/(halal|pork|lard|babi|alcohol|alkohol|muslim)/.test(q)) {
    return {
      reply: isId
        ? "Tenang saja, seluruh menu di SMALL GAPS 100% No Alcohol, No Pork, dan No Lard."
        : "Yes, you can dine with peace of mind here. Everything at SMALL GAPS is 100% No Alcohol, No Pork, and No Lard.",
    };
  }

  if (
    /(where|location|alamat|dimana|di mana|route|rute|jalan|starlet|escalator|eskalator|parkir|parking|gading|serpong|branch|cabang|get here|ke sini)/.test(
      q
    )
  ) {
    return {
      reply: isId
        ? "Kami ada di Hotel Starlet BSD Lt. 2 (Jl. BSD Boulevard Utara) dengan parkir luas. Dari depan hotel, naik tangga pendek, belok kanan ke 2 eskalator ke Lt. 2, lalu belok kiri dua kali lewat lorong oranye. Kami juga segera buka cabang baru di Gading Serpong Desember 2026!"
        : "We're on the 2nd floor of Hotel Starlet BSD (Jl. BSD Boulevard Utara, Tangerang) with plenty of parking. From the hotel front, go up the short steps, turn right to the twin escalators up to 2F, then turn left twice past the orange arch. We're also opening a new Gading Serpong store in December 2026!",
    };
  }

  if (
    /(hour|open|close|buka|tutup|jam|price|harga|berapa|rating|review|bintang)/.test(
      q
    )
  ) {
    return {
      reply: isId
        ? "Kami buka setiap hari pukul 08.00-22.00 WIB dengan kisaran Rp50.000-Rp150.000. Alhamdulillah rating kami 5.0 dari 271 ulasan di Google!"
        : "We're open every day from 08:00 to 22:00 WIB, with prices around Rp50.000-Rp150.000. We're grateful to hold a 5.0 rating from 271 Google reviews!",
    };
  }

  if (/(reserve|reservasi|book|booking|wa|whatsapp|pesan|table|meja)/.test(q)) {
    return {
      reply: isId
        ? "Dengan senang hati! Ketuk saja tombol hijau Reservasi di bawah untuk langsung chat tim kami di WhatsApp (+62 818-199-099)."
        : "I'd love to save a cozy table for you! Just tap the green Reserve button to message our team directly on WhatsApp (+62 818-199-099).",
    };
  }

  return {
    reply: isId
      ? "Hehe, sebagai barista di sini saya hanya bisa ngobrol seputar SMALL GAPS Coffee BSD ya! Tanya saja soal kopi seperti Gaps Latte, makanan, tempat WFC, jam buka, atau rute ke Hotel Starlet BSD Lt. 2."
      : "Haha, I'm just your friendly barista here, so I can only chat about SMALL GAPS Coffee BSD! Feel free to ask me about our signature drinks like Gaps Latte, food & pastries, WFC seating, opening hours, or how to find us on the 2nd floor of Hotel Starlet BSD.",
  };
}
