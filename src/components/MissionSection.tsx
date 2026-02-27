import { motion } from "framer-motion";
import { Target, TrendingUp, Shield } from "lucide-react";

const pillars = [
{
  icon: Target,
  title: "Strategic Technologies",
  description:
  "Deep sector expertise in digital (quantum, infrastructural AI, ...), physical (space, deeptech, ...) and health (biotech and medtech) - with strong research and corporate connections."
},
{
  icon: TrendingUp,
  title: "Built in & Backed in Europe",
  description:
  "Helping scaleups move from technical validation to industrial deployment and international expansion - faster and with the right European partner."
},
{
  icon: Shield,
  title: "Tech Sovereignty",
  description:
  "Keeping strategic technologies anchored in Europe requires a sustained base of experienced growth investors - ASTRA consolidates that experience."
}];


const MissionSection = () => {
  return (
    <section
      id="mission"
      className="py-20 md:py-24 relative"
      style={{ background: "hsl(220, 56%, 8%)" }}>

      {/* Subtle accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: "linear-gradient(to bottom, hsl(43, 96%, 56%), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(43, 96%, 56%)" }}>

            Our Mission
          </p>
          <h2
            className="text-3xl md:text-5xl font-display font-bold mb-6"
            style={{ color: "hsl(220, 20%, 92%)" }}>

            Fueling Europe's Growth Engine
          </h2>
          <p
            className="font-body max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "hsl(220, 20%, 60%)" }}>Europe's foundations are strong — unmatched scientific depth, entrepreneurial ambition, and industrial resilience. Yet when companies reach decisive growth phases, rounds are too often led outside Europe.
            <br /><br />
            ASTRA is changing that trajectory.



          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => <motion.div
            key={pillar.title}
            className="group relative p-8 rounded-2xl border transition-all duration-500 hover:border-opacity-50"
            style={{
              background: "hsl(220, 45%, 11%)",
              borderColor: "hsl(220, 30%, 18%)"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -4 }}>

              {/* Hover glow */}
              <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 0%, hsla(43, 80%, 50%, 0.06), transparent 60%)"
              }} />

              <div className="relative z-10">
                <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "hsla(43, 96%, 56%, 0.1)" }}>

                  <pillar.icon className="w-5 h-5" style={{ color: "hsl(43, 96%, 56%)" }} />
                </div>
                <h3
                className="text-xl font-display font-semibold mb-3"
                style={{ color: "hsl(220, 20%, 90%)" }}>

                  {pillar.title}
                </h3>
                <p className="font-body leading-relaxed text-sm" style={{ color: "hsl(220, 20%, 55%)" }}>
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default MissionSection;