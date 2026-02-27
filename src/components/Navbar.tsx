import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import astraLogo from "@/assets/astra-logo.png";

const navItems = [
  { label: "Mission", href: "#mission" },
  { label: "Alliance", href: "#alliance" },
  { label: "Impact", href: "#stats" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "hsla(220, 56%, 10%, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={astraLogo} alt="ASTRA" className="h-8 w-auto brightness-0 invert" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-sm tracking-wide transition-colors duration-200"
              style={{ color: "hsl(220, 20%, 70%)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(43, 96%, 56%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(220, 20%, 70%)")}
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:contact@astra-alliance.eu"
            className="px-5 py-2 rounded-full font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--gold-gradient)",
              color: "hsl(220, 56%, 10%)",
            }}
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white/70 transition-transform" style={{ transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none" }} />
          <span className="w-6 h-0.5 bg-white/70 transition-opacity" style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span className="w-6 h-0.5 bg-white/70 transition-transform" style={{ transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden px-6 pb-6"
            style={{ background: "hsla(220, 56%, 10%, 0.95)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 font-body text-sm"
                style={{ color: "hsl(220, 20%, 70%)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
