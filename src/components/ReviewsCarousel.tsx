import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { PanInfo } from "framer-motion";

const REVIEWS = [
  {
    quote:
      "\u201cFrom asking better questions to making my first investment.\u201d",
    body: "This program gave me confidence to make my first investment. Learning how to ask the right questions and where to focus during due diligence was invaluable. I now feel ready to make additional angel investments soon.",
    name: "Aneta Eprikyan",
    role: "CFO at Telecom Company",
    location: "Armenia",
    avatar: "/assets_mobile/Aneta Eprikyan.png",
  },
  {
    quote:
      "\u201cIt didn\u2019t just teach me investing. It changed how I decide.\u201d",
    body: "What an amazing program! I joined it 'knowing' what the discussions would be about. And I was surprised not only by the conversations' content but about what I learned about investing and my investment thesis. My favorite question was asked in Session 16, by a fellow participant: 'As investors, do you want to be seen as the investor that invested in X, or the investor that invested in Y?' This question helped solidify my choice.",
    name: "Joel Cohen",
    role: "Principal Product Manager - F5",
    location: "UK",
    avatar: "/assets_mobile/Joel_Cohen.png",
  },
  {
    quote: "\u201cAngel investing finally felt accessible.\u201d",
    body: "The program is amazing for anyone new to angel investing. It helped me understand how different investors approach startups, the full due diligence process, and how to structure evaluations. While overwhelming at first, participating has made angel investing feel accessible to me.",
    name: "Assumpta Munsi",
    role: "Founder, Communication Coach | Opera Singer",
    location: "Germany, based in Barcelona",
    avatar: "/assets_mobile/Assumpta Munsi.png",
  },
  {
    quote: "\u201cDeep learning comes from real-life context.\u201d",
    body: "There is no better way of learning what you read in textbooks and watch in videos about valuations, security types, economic terms, investors rights, and so forth, than to put it into practice in real life conversations with founders. At every cohort, we are able to evaluate 60+ of companies, examine their team culture, understand their market opportunity, and ultimately assess why they are uniquely positioned to generate value. As I continue my journey as startup investor, I feel more equipped to evaluate companies at an early stage with a deep understanding of what it takes to support them in their journey to success.",
    name: "Matteo Costa",
    role: "Vice President, Marketing Development & Operations - Penguin Random House",
    location: "USA",
    avatar: "/assets_mobile/Matteo_Costa.png",
  },
  {
    quote:
      "\u201cIt clarified what actually matters in an investment decision.\u201d",
    body: "The program confirmed some of my investment hypotheses and taught me the importance of separating deal terms from company evaluation. I now see angel investing as accessible and am planning to make additional investments soon.",
    name: "AnnaMaria White",
    role: "Founder and Strategic Communications Executive | Ex-Amazon",
    location: "USA, based in Barcelona",
    avatar: "/assets_mobile/AnnaMaria White.png",
  },
  {
    quote:
      "\u201cA safe space for you to broaden your knowledge in industries.\u201d",
    body: "One exciting thing about the program is that it creates a safe space for you to broaden your knowledge in industries. You can be an expert in a particular sector and never venture outside it. This program is excellent at providing you with a network of other investors with additional expertise you can tap into and many companies from different backgrounds and locations. This is an excellent way of learning the ropes of angel investing with like-minded people.",
    name: "Joao Paulo Diogo",
    role: "Fund Leader - COREangels Lisbon",
    location: "Portugal",
    avatar: "/assets_mobile/Joao_Paulo_Diego.png",
  },
];

const CARD_GAP = 12;
const CARD_PEEK = 40; // how much of the next card is visible
const CARD_LEFT_PAD = 16;

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setCardWidth(
          containerRef.current.offsetWidth - CARD_LEFT_PAD - CARD_PEEK,
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!inView) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [inView, current]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) {
      setCurrent((c) => (c + 1) % REVIEWS.length);
    } else if (info.offset.x > 50) {
      setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
    }
  };

  return (
    <section
      ref={ref}
      className="pt-0 pb-4"
      style={{
        background:
          "linear-gradient(to bottom, #EEE9DE 0%, #EEE9DE 50%, #f4f7ec 100%)",
      }}
    >
      {/* Carousel track */}
      <motion.div
        ref={containerRef}
        style={{ overflow: "hidden" }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center"
          style={{ paddingLeft: CARD_LEFT_PAD }}
          animate={{
            x:
              -(current * (cardWidth + CARD_GAP)) +
              (current / (REVIEWS.length - 1)) * (CARD_PEEK - CARD_LEFT_PAD),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{
            left:
              -((REVIEWS.length - 1) * (cardWidth + CARD_GAP)) +
              (CARD_PEEK - CARD_LEFT_PAD),
            right: 0,
          }}
          onDragEnd={handleDragEnd}
        >
          {REVIEWS.map((review, i) => {
            return (
              <div
                key={i}
                style={{
                  width: cardWidth,
                  flexShrink: 0,
                  marginRight: CARD_GAP,
                }}
              >
                <div
                  className="rounded-2xl bg-white p-4 select-none"
                  style={{ border: "1px solid #E5E7EB" }}
                >
                  {/* Quote */}
                  <p
                    className="font-avenir-heavy leading-[1.2] mb-1"
                    style={{
                      color: "#0B2232",
                      fontSize: "19px",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {review.quote}
                  </p>

                  {/* Body — Always displayed */}
                  <div className="overflow-hidden">
                    <p
                      className="font-avenir-regular leading-[1.4] mb-4"
                      style={{
                        color: "#4B5563",
                        fontSize: "15px",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {review.body}
                    </p>
                  </div>

                  {/* Footer: avatar + name/role */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="rounded-full object-cover shrink-0"
                        style={{ width: 32, height: 32 }}
                        loading="lazy"
                      />
                      <div className="pt-1.5 flex flex-col">
                        <p
                          className="font-avenir-medium text-[13.5px] leading-[1.1]"
                          style={{
                            color: "#1B2A4A",
                            letterSpacing: "-0.02em",
                            marginBottom: "-1px",
                          }}
                        >
                          — {review.name}
                        </p>
                        <p
                          className="font-avenir-medium text-[13.5px] leading-[1.1]"
                          style={{ color: "#6B7280", letterSpacing: "-0.01em" }}
                        >
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Dot indicators — circle outlines, active filled yellow */}
      <div className="flex justify-center gap-2 mt-5">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-200"
            style={{
              width: 8,
              height: 8,
              background: i === current ? "#FBD979" : "#D1D5DB",
              border: `1px solid ${i === current ? "#FBD979" : "#D1D5DB"}`,
            }}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
