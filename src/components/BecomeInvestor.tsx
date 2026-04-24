import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BecomeInvestor({ dark }: { dark: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 pt-[75px] pb-[26px] text-center">
      <motion.h2
        className="font-avenir-heavy leading-[1.05] mb-[8px]"
        style={{ fontSize: "38px" }}
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 14,
          color: dark ? "#ffffff" : "#060621",
        }}
        transition={{ duration: 0.55 }}
      >
        Become the
        <br />
        Investor You Were
        <br />
        Meant to Be
      </motion.h2>

      <motion.p
        className="font-avenir-regular"
        style={{
          margin: "0 auto",
          fontSize: "13.51px",
          fontFamily: "AvenirNext",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 10,
          color: dark ? "rgba(255,255,255,0.7)" : "#202020",
        }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        What happens when learning turns into real decisions.
      </motion.p>
    </section>
  );
}
