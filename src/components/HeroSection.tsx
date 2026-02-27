import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Content — left-aligned so the Europe map shows on the right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-2xl">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: "hsl(43, 96%, 56%)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Alliance for Strategic Tech Resilience and Acceleration
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8"
            style={{ color: "hsl(220, 20%, 92%)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            Scaling Europe's{" "}
            <span className="text-gold-gradient">Next Tech Leaders</span>
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "hsl(220, 20%, 65%)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            A coordinated growth-stage platform uniting leading European
            investors to ensure the next generation of global tech champions can
            be built, scaled and retained in Europe.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#mission"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--gold-gradient)",
                color: "hsl(220, 56%, 10%)",
              }}
            >
              Our Mission →
            </a>
            <a
              href="#alliance"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-body font-medium text-sm tracking-wide border transition-all duration-300 hover:bg-white/5"
              style={{
                borderColor: "hsl(220, 20%, 30%)",
                color: "hsl(220, 20%, 75%)",
              }}
            >
              The Alliance
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into the first solid section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(220, 56%, 8%), transparent)",
        }}
      />
    </section>
  );
};

export default HeroSection;
