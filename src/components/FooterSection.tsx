import astraLogo from "@/assets/astra-logo.png";

const FooterSection = () => {
  return (
    <footer
      className="py-16 relative"
      style={{ background: "hsl(220, 56%, 6%)" }}>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(220, 30%, 20%), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 text-center">
        <img
          src={astraLogo}
          alt="ASTRA"
          className="mx-auto h-14 w-auto brightness-0 invert mb-6 opacity-80" />

        <p
          className="font-body text-sm mb-8 max-w-md mx-auto leading-relaxed"
          style={{ color: "hsl(220, 20%, 45%)" }}>Building the future of European tech, together.


        </p>
        <a
          href="mailto:contact@astra-alliance.eu"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
          style={{
            background: "var(--gold-gradient)",
            color: "hsl(220, 56%, 10%)"
          }}>

          Get in Touch
        </a>
        <p
          className="mt-12 font-body text-xs"
          style={{ color: "hsl(220, 20%, 30%)" }}>

          © {new Date().getFullYear()} ASTRA Alliance. All rights reserved.
        </p>
      </div>
    </footer>);

};

export default FooterSection;