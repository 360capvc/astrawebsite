import { motion } from "framer-motion";

const stats = [
  { value: "6", label: "Founding Partners" },
  { value: "€4B+", label: "Invested in Europe" },
  { value: "20+", label: "Offices across Europe" },
  { value: "800+", label: "Backed Companies" },
];

const StatsSection = () => {
  return (
    <section
      id="stats"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "hsl(220, 50%, 12%)" }}
    >
      {/* Horizontal lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, hsl(220, 40%, 50%) 0px, hsl(220, 40%, 50%) 1px, transparent 1px, transparent 80px)",
      }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(43, 96%, 56%)" }}>
            Impact
          </p>
          <h2
            className="text-3xl md:text-5xl font-display font-bold mb-6"
            style={{ color: "hsl(220, 20%, 92%)" }}>
            Proven Builders at Scale
          </h2>
          <p
            className="font-body max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "hsl(220, 20%, 60%)" }}>
            Beyond our combined track record, our alliance is unique: we bridge academia and growth - staying closest to breakthrough technologies while proving our ability to industrialise and scale them.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-3">
                {stat.value}
              </p>
              <p
                className="text-xs font-body font-medium tracking-[0.2em] uppercase"
                style={{ color: "hsl(220, 20%, 50%)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
