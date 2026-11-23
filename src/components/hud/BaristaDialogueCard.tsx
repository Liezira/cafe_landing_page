"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { UI_COPY } from "@/lib/config/i18n";
import { getBaristaReply, type BaristaChatMessage } from "@/lib/engine/baristaChat";
import { buildWhatsAppUrl } from "@/lib/engine/whatsappLink";
import { useCafeStore } from "@/store/useCafeStore";

/**
 * Cozy slice-of-life (Citampi Stories / Harvest Moon inspired) interactive
 * Barista chat & warm order reaction card strictly bounded to SMALL GAPS BSD.
 */
export function BaristaDialogueCard() {
  const showBaristaDialogue = useCafeStore((s) => s.showBaristaDialogue);
  const language = useCafeStore((s) => s.language);
  const t = UI_COPY[language];
  const orderedItem = useCafeStore((s) => s.orderedItem);
  const orderMenuItemPreview = useCafeStore((s) => s.orderMenuItemPreview);
  const setActiveDrawer = useCafeStore((s) => s.setActiveDrawer);
  const dismissBaristaDialogue = useCafeStore((s) => s.dismissBaristaDialogue);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<BaristaChatMessage[]>([
    {
      id: "welcome",
      sender: "barista",
      text: "Welcome up to the 2nd floor! Ask me anything about SMALL GAPS Coffee BSD, or tap a menu item to watch me prepare it at the bar.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // React warmly whenever the guest orders a menu item preview
  useEffect(() => {
    if (!orderedItem) return;
    const warmNote =
      orderedItem.id === "gaps-latte"
        ? `Your fresh ${orderedItem.name} is ready on the bar! Best enjoyed within 5 minutes while the espresso layers are silky.`
        : `Freshly prepared ${orderedItem.name} is right on the counter for you! Would you like to reserve a cozy spot on WhatsApp to enjoy it in person?`;

    setMessages((prev) => [
      ...prev,
      {
        id: `order-${Date.now()}`,
        sender: "barista",
        text: warmNote,
      },
    ]);
  }, [orderedItem]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showBaristaDialogue]);

  if (!showBaristaDialogue) return null;

  const sendQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const { reply, suggestedMenuId } = getBaristaReply(trimmed, language);
    setMessages((prev) => [
      ...prev,
      { id: `g-${Date.now()}`, sender: "guest", text: trimmed },
      {
        id: `b-${Date.now() + 1}`,
        sender: "barista",
        text: reply,
        suggestedMenuId,
      },
    ]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-25 flex justify-center p-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:bottom-6">
      <section
        role="dialog"
        aria-label="Chat with SMALL GAPS Barista"
        className="pointer-events-auto hud-glass-elevated flex w-full max-w-lg flex-col rounded-[22px] p-4 text-[#FAF7F2] shadow-2xl sm:p-5"
      >
        {/* Header with Portrait */}
        <div className="flex items-center justify-between gap-3 border-b border-[#FAF7F2]/14 pb-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/cafe/barista-portrait.png"
              alt="SMALL GAPS Barista"
              className="h-12 w-12 shrink-0 rounded-[12px] border border-[#E5A970]/45 object-cover"
            />
            <div>
              <h2 className="font-serif text-base font-medium text-[#E5A970]">
                Barista · SMALL GAPS BSD
              </h2>
              <p className="text-[11px] text-[#D8CEC2]">
                Ask me about our menu, WFC seats, or location
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={dismissBaristaDialogue}
            aria-label="Close barista chat"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#D8CEC2] hover:bg-[#FAF7F2]/12 hover:text-[#FAF7F2]"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Chat Thread */}
        <div
          ref={scrollRef}
          className="mt-3 max-h-40 space-y-2.5 overflow-y-auto pr-1 text-sm"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "guest" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[88%] rounded-[14px] px-3.5 py-2 leading-relaxed ${
                  msg.sender === "guest"
                    ? "bg-[#FAF7F2] text-[#14110F]"
                    : "bg-[#2E2722]/90 text-[#FAF7F2]"
                }`}
              >
                {msg.text}
              </div>
              {msg.suggestedMenuId && (
                <button
                  type="button"
                  onClick={() => orderMenuItemPreview(msg.suggestedMenuId!)}
                  className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-[#E5A970]/45 px-2.5 py-1 text-[11px] font-medium text-[#E5A970] transition hover:bg-[#E5A970] hover:text-[#14110F]"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Prepare this at the bar</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Quick Question Pills */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
          {t.baristaQuickQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendQuestion(q)}
              className="shrink-0 rounded-full border border-[#FAF7F2]/18 px-3 py-1 text-[11px] font-medium text-[#D8CEC2] transition hover:bg-[#FAF7F2]/14 hover:text-[#FAF7F2]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Warm Chat Input */}
        <form onSubmit={handleSubmit} className="mt-2.5 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.baristaPlaceholder}
            className="min-h-[42px] flex-1 rounded-full border border-[#FAF7F2]/18 bg-[#14110F]/70 px-4 text-xs text-[#FAF7F2] placeholder-[#8C7E73] focus:border-[#E5A970] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#FAF7F2] text-[#14110F] transition hover:bg-[#F2ECE1]"
          >
            <Send className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </form>

        {/* Bottom Actions */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveDrawer("menu")}
            className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full border border-[#FAF7F2]/20 px-3 py-1.5 text-xs font-medium text-[#FAF7F2] transition hover:bg-[#FAF7F2]/12"
          >
            <UtensilsCrossed className="h-3.5 w-3.5" strokeWidth={1.6} />
            <span>Order from Menu</span>
          </button>
          <a
            href={buildWhatsAppUrl("menu")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#1B5E3A] px-3 py-1.5 text-xs font-semibold text-[#FAF7F2] transition hover:bg-[#154C2E]"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>Reserve on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
