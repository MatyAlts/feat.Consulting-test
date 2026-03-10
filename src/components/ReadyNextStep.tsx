import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ReadyNextStep() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 pt-12 pb-20"
      style={{ background: "#f2f2f2" }}
    >
      {/* Overlapping Dark Info Card (Desktop colors Applied to Mobile Design) */}
      <motion.div
        className="relative bg-[#1A1C25] w-full max-w-[360px] rounded-[40px] px-8 pt-10 pb-10 flex flex-col items-center text-center shadow-2xl"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2
          className="font-avenir-heavy leading-none mb-3"
          style={{ fontSize: "1.95rem", color: "#FFFFFF" }}
        >
          Ready for the
          <br />
          Next Step?
        </h2>

        <p
          className="font-avenir-regular text-[15px] leading-snug mb-9"
          style={{ color: "#94969C", maxWidth: 280 }}
        >
          If you're serious about learning through real decisions, let's talk.
        </p>

        <motion.a
          href={import.meta.env.VITE_APPLY_URL || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="font-avenir-heavy bg-[#FED97F] text-[#1A1C25] flex items-center justify-center rounded-2xl py-4 text-base px-10 w-full shadow-lg"
          style={{ boxShadow: "0 4px 14px 0 rgba(254, 217, 127, 0.2)" }}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={{
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            hover: { filter: "brightness(1.05)" },
            tap: { scale: 0.98 },
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          aria-label="See if SIA is right for you"
        >
          <span className="mr-2">See if SIA is right for you</span>
          <img
            src="/assets_mobile/flecha.svg"
            alt=""
            className="w-[8.5px] h-[8.5px]"
            style={{ filter: "brightness(0) invert(0.1)" }}
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
