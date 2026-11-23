"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { UI_COPY } from "@/lib/config/i18n";
import {
  getBaristaReply,
  type BaristaChatMessage,
} from "@/lib/engine/baristaChat";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

export function BaristaChatDrawer() {
  const baristaOpen = useCafeStore((s) => s.baristaOpen);
  const orderedItemName = useCafeStore((s) => s.orderedItemName);
  const openBarista = useCafeStore((s) => s.openBarista);
  const closeBarista = useCafeStore((s) => s.closeBarista);
  const language = useCafeStore((s) => s.language);

  const [showFab, setShowFab] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BaristaChatMessage[]>([
    {
      id: "init",
      sender: "barista",
      text: "Welcome up to the 2nd floor! Ask me anything about SMALL GAPS Coffee BSD, or tap a menu item to preview it.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const t = UI_COPY[language];

  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 360);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!orderedItemName) return;
    const text =
      orderedItemName === "Gaps Latte"
        ? "Freshly pouring your Gaps Latte right now! Best enjoyed within 5 minutes while the espresso layers are silky."
        : `Warmly preparing ${orderedItemName} for you! Tap Reserve anytime to enjoy it in person on the 2nd floor of Hotel Starlet BSD.`;
    setMessages((prev) => [
      ...prev,
      { id: `order-${Date.now()}`, sender: "barista", text },
    ]);
  }, [orderedItemName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, baristaOpen]);

  const sendMessage = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const { reply } = getBaristaReply(trimmed, language);
    setMessages((prev) => [
      ...prev,
      { id: `g-${Date.now()}`, sender: "guest", text: trimmed },
      { id: `b-${Date.now() + 1}`, sender: "barista", text: reply },
    ]);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {showFab && !baristaOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            onClick={() => openBarista()}
            aria-label="Ask SMALL GAPS Barista"
            className="glass-pill fixed right-4 bottom-5 z-40 flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2 text-xs font-semibold text-[#FAF7F2] shadow-2xl sm:right-6 sm:bottom-6"
          >
            <img
              src="/images/cafe/barista-portrait.png"
              alt="SMALL GAPS Barista"
              className="h-9 w-9 rounded-full border border-[#E5A970]/70 object-cover"
            />
            <span>Ask Barista</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {baristaOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6 sm:left-auto sm:p-0"
          >
            <section
              role="dialog"
              aria-label="Chat with SMALL GAPS Barista"
              className="glass-pill flex w-full max-w-md flex-col rounded-[22px] p-4 text-[#FAF7F2] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#FAF7F2]/14 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/cafe/barista-portrait.png"
                    alt="SMALL GAPS Barista"
                    className="h-11 w-11 rounded-[12px] border border-[#E5A970]/50 object-cover"
                  />
                  <div>
                    <p className="font-serif text-base font-medium text-[#E5A970]">
                      Barista · SMALL GAPS BSD
                    </p>
                    <p className="text-[11px] text-[#D8CEC2]">
                      Scoped strictly to SMALL GAPS Coffee BSD
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeBarista}
                  aria-label="Close barista chat"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#D8CEC2] hover:bg-[#FAF7F2]/12"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="mt-3 max-h-48 space-y-2.5 overflow-y-auto pr-1 text-sm"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === "guest" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-[14px] px-3.5 py-2 leading-relaxed ${
                        m.sender === "guest"
                          ? "bg-[#FAF7F2] text-[#14110F]"
                          : "bg-[#2E2722] text-[#FAF7F2]"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
                {t.baristaQuick.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    className="shrink-0 rounded-full border border-[#FAF7F2]/20 px-3 py-1 text-[11px] text-[#D8CEC2] hover:bg-[#FAF7F2]/14"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="mt-2.5 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.baristaPlaceholder}
                  className="min-h-[42px] flex-1 rounded-full border border-[#FAF7F2]/18 bg-[#14110F]/80 px-4 text-xs text-[#FAF7F2] placeholder-[#8C7E73] focus:border-[#E5A970] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] text-[#14110F]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-full bg-[#1B5E3A] text-xs font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Reserve on WhatsApp</span>
              </a>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
