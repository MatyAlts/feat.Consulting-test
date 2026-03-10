import { useState, useRef, useEffect, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
  {
    image: "/assets_mobile/plays_out_pic1.png",
    title: "Engage in Live Investment Opportunities",
    subtitle: 'You don\'t "practice" investing. You take part in it.',
    body: "You work with our pool of active startups, tangible materials, and real timelines (not case studies or simulations).\n\nYou evaluate opportunities as they unfold, discuss tradeoffs with peers, and co-invest in live deals.\n\nBy the end, this isn't theoretical exposure. It's experience you can recognize and reuse.",
  },
  {
    image: "/assets_mobile/plays_out_pic2.png",
    title: "Sharpen Your Thinking with Other Investors",
    subtitle: "Judgment is formed in interaction, not isolation.",
    body: "You challenge assumptions, weigh perspectives, and pressure-test decisions alongside a diverse group of thoughtful investors, in real time.",
  },
  {
    image: "/assets_mobile/plays_out_pic3.png",
    title: "Make an Investment Together",
    subtitle: "From discussion to commitment.",
    body: "You move from debate to action by co-investing with peers, pooling judgment, sharing responsibility, and committing capital together.",
  },
  {
    image: "/assets_mobile/plays_out_pic4.png",
    title: "Forge Your Investor Lens",
    subtitle: "The perspective you'll use in every future investment.",
    body: "Through repeated real decisions, you emerge with a personal investment perspective: a repeatable way to assess risk, quality, and fit on your own terms.",
  },
];

const STACK_OFFSET = 16;

/* ── Bottom Sheet ── */
function BottomSheet({
  index,
  onClose,
  onChangeIndex,
}: {
  index: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const card = CARDS[index];
  const n = CARDS.length;

  const next = () => onChangeIndex((index + 1) % n);
  const prev = () => onChangeIndex((index - 1 + n) % n);

  return (
    <>
      {/* Backdrop overlay with blur */}
      <motion.div
        key="sheet-backdrop"
        className="fixed inset-0 z-100"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
        }}
        exit={{
          opacity: 0,
          backgroundColor: "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onClick={onClose}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* Refined Close Button - Aligned with mobile frame */}
      <div className="fixed inset-0 pointer-events-none z-200 max-w-[428px] mx-auto">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={onClose}
          className="absolute top-6 right-6 pointer-events-auto p-2 text-white/40 active:text-white transition-opacity group"
          aria-label="Close"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      {/* Sheet */}
      <motion.div
        key="sheet-panel"
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-101 max-w-[428px] mx-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose();
          }
        }}
      >
        <div
          className="rounded-t-[24px] overflow-hidden flex flex-col"
          style={{
            background: "#0B2232",
            boxShadow: "0 -10px 40px rgba(0,0,0,0.3)",
            maxHeight: "92vh",
          }}
        >
          {/* Header area with drag handle */}
          <div className="relative pt-4 pb-2 flex justify-center items-center">
            <div
              className="w-10 h-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-[180px] px-4 shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Content */}
              <div
                className="px-6 pt-5 pb-4 overflow-y-auto"
                style={{ maxHeight: "calc(92vh - 280px)" }}
              >
                <h3 className="text-white text-[24px] font-avenir-heavy leading-tight mb-1.5 tracking-tight">
                  {card.title}
                </h3>
                <p className="opacity-60 text-[#FBD979] text-sm font-avenir-medium italic leading-tight mb-5">
                  {card.subtitle}
                </p>

                {/* Body paragraphs */}
                <div className="space-y-3.5">
                  {card.body.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="font-avenir-regular text-neutral-50/80 text-[15px] leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Footer - Compacted */}
          <div className="mt-auto px-6 py-4 flex items-center justify-between border-t border-white/5 bg-[#0B2232]">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 active:text-white transition-all cursor-pointer"
              aria-label="Previous card"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Bullets */}
            <div className="flex gap-2">
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onChangeIndex(i)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: i === index ? 20 : 6,
                    height: 6,
                    background:
                      i === index ? "#FBD979" : "rgba(255,255,255,0.2)",
                  }}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 active:text-white transition-all cursor-pointer"
              aria-label="Next card"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ── Card ── */
const PlaysOutCard = forwardRef<
  HTMLDivElement,
  {
    card: (typeof CARDS)[0];
    index: number;
    totalCards: number;
    onTap: () => void;
  }
>(({ card, index, totalCards: _totalCards, onTap }, ref) => {
  const titleOffset = 110;
  const stickyTop = titleOffset + index * STACK_OFFSET;
  const innerRef = useRef<HTMLDivElement>(null);
  const [shadowIntensity, setShadowIntensity] = useState(0);

  const handleScroll = useCallback(() => {
    if (!innerRef.current || index === 0) {
      setShadowIntensity(0);
      return;
    }

    const stickyDiv = innerRef.current.parentElement;
    if (!stickyDiv) return;

    const myRect = stickyDiv.getBoundingClientRect();
    const distanceFromStuck = myRect.top - stickyTop;

    if (distanceFromStuck <= 0) {
      setShadowIntensity(1);
    } else if (distanceFromStuck < 120) {
      setShadowIntensity(1 - distanceFromStuck / 120);
    } else {
      setShadowIntensity(0);
    }
  }, [index, stickyTop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const upwardShadow =
    shadowIntensity > 0.05
      ? `0px -${4 + shadowIntensity * 12}px ${12 + shadowIntensity * 20}px rgba(0,0,0,${0.08 + shadowIntensity * 0.14})`
      : "none";

  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: stickyTop,
        zIndex: 20 + index,
        paddingBottom: 48,
      }}
    >
      <div
        ref={innerRef}
        className="relative w-full max-w-[340px] mx-auto overflow-visible cursor-pointer"
        onClick={onTap}
        style={{
          borderRadius: 16,
          boxShadow: upwardShadow,
          transition: "box-shadow 0.2s ease-out",
        }}
      >
        <div className="w-full h-[206px] relative z-0">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>

        <div
          className="relative -mt-[32px] mx-[6.5px] z-10 bg-[#0B2232] rounded-2xl flex flex-col"
          style={{ boxShadow: "0px 4.15px 20.67px 0px rgba(0,0,0,0.15)" }}
        >
          <div className="px-5 py-4 flex flex-col justify-center items-start gap-2">
            <div className="flex flex-col justify-start items-start gap-[5px] w-full">
              <h3 className="w-full text-white text-2xl font-medium font-['Avenir'] leading-8">
                {card.title}
              </h3>
              <p className="w-full opacity-60 text-neutral-50 text-sm font-medium font-['Avenir'] leading-tight mt-1">
                {card.subtitle}
              </p>
            </div>

            <div className="w-full flex justify-end mt-1">
              <span className="text-[#FBD979] text-3xl font-avenir-light leading-none">
                +
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ── Section ── */
export default function PlaysOutCards() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [bgHeight, setBgHeight] = useState(0);
  const lastCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleY, setTitleY] = useState(0);

  const updateScrollEffects = () => {
    if (lastCardRef.current && containerRef.current) {
      const card = lastCardRef.current;
      const height = card.offsetTop + card.offsetHeight / 2;
      setBgHeight(height);
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const sectionBottom = rect.bottom;
      const pushThreshold = 460;
      if (sectionBottom < pushThreshold) {
        setTitleY(sectionBottom - pushThreshold);
      } else {
        setTitleY(0);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(updateScrollEffects, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateScrollEffects);
    window.addEventListener("scroll", updateScrollEffects, { passive: true });
    return () => {
      window.removeEventListener("resize", updateScrollEffects);
      window.removeEventListener("scroll", updateScrollEffects);
    };
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      <section
        ref={containerRef}
        className="px-4 pt-0 relative -mt-[140px] z-20"
        style={{ background: "#f4f8ed" }}
      >
        <div
          className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
          style={{
            background: "#EEE9DE",
            height: bgHeight,
            transition: "height 0.3s ease-out",
          }}
        />

        <motion.div
          className="sticky top-0 z-10 text-center pt-4 pb-5"
          style={{
            background: "#EEE9DE",
            y: titleY,
          }}
        >
          <div className="flex items-center justify-center gap-4 px-4">
            <div className="flex-1 h-px bg-[#070c17]/10" />
            <p
              className="font-avenir-heavy shrink-0"
              style={{ color: "#070c17", fontSize: 19 }}
            >
              Here&apos;s how that plays out:
            </p>
            <div className="flex-1 h-px bg-[#070c17]/10" />
          </div>
        </motion.div>

        {CARDS.map((card, i) => (
          <PlaysOutCard
            key={i}
            card={card}
            index={i}
            totalCards={CARDS.length}
            onTap={() => setSelectedIndex(i)}
            ref={i === CARDS.length - 1 ? lastCardRef : null}
          />
        ))}

        <div className="relative z-10" style={{ height: 300 }} />
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <BottomSheet
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onChangeIndex={(i) => setSelectedIndex(i)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
