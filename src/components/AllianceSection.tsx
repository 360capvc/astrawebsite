import { motion } from "framer-motion";
import logo360 from "@/assets/logo-360capital.png";
import logoBullhound from "@/assets/logo-bullhound.png";
import logoRedstone from "@/assets/logo-redstone.png";
import logoTruffle from "@/assets/logo-truffle.png";
import logoUvc from "@/assets/logo-uvc.png";
import logo28 from "@/assets/logo-28digital.png";

import personFausto from "@/assets/person-fausto.png";
import personLaetitia from "@/assets/person-laetitia.png";
import personHugh from "@/assets/person-hugh.png";
import personJonathan from "@/assets/person-jonathan.png";
import personMichael from "@/assets/person-michael.png";
import personLukas from "@/assets/person-lukas.png";
import personBernard from "@/assets/person-bernard.png";
import personBozena from "@/assets/person-bozena.png";
import personJohannes from "@/assets/person-johannes.png";
import personIngo from "@/assets/person-ingo.png";
import personDiva from "@/assets/person-diva.png";
import personAndrea from "@/assets/person-andrea.png";

const funds = [
  {
    name: "360 Capital", location: "Paris & Milan", logo: logo360,
    people: [
      { firstName: "Fausto", lastName: "Boni", photo: personFausto, linkedin: "https://www.linkedin.com/in/fausto-boni-839137/" },
      { firstName: "Laetitia", lastName: "de Panafieu", photo: personLaetitia, linkedin: "https://www.linkedin.com/in/laetitia-de-panafieu-65b919a4/" },
    ],
  },
  {
    name: "Bullhound Capital", location: "Luxembourg, Stockholm, Paris, Madrid & London", logo: logoBullhound,
    people: [
      { firstName: "Hugh", lastName: "Campbell", photo: personHugh, linkedin: "https://www.linkedin.com/in/hucampbell/" },
      { firstName: "Jonathan", lastName: "Sibilia", photo: personJonathan, linkedin: "https://www.linkedin.com/in/jonathan-sibilia-160b611/" },
    ],
  },
  {
    name: "Redstone", location: "Berlin, Helsinki, Stockholm, Zurich & Munich", logo: logoRedstone,
    people: [
      { firstName: "Michael", lastName: "Brehm", photo: personMichael, linkedin: "https://www.linkedin.com/in/michaelbrehm/" },
      { firstName: "Lukas", lastName: "André", photo: personLukas, linkedin: "https://www.linkedin.com/in/lukasandre/" },
    ],
  },
  {
    name: "Truffle Capital", location: "Paris", logo: logoTruffle,
    people: [
      { firstName: "Bernard-Louis", lastName: "Roques", photo: personBernard, linkedin: "https://www.linkedin.com/in/blroques/" },
      { firstName: "Bozena", lastName: "Adamczyk", photo: personBozena, linkedin: "https://www.linkedin.com/in/bozena-adamczyk-b5b8a79/" },
    ],
  },
  {
    name: "UVC Partners", location: "Munich & Berlin", logo: logoUvc,
    people: [
      { firstName: "Johannes", lastName: "von Borries", photo: personJohannes, linkedin: "https://www.linkedin.com/in/johannesvonborries/" },
      { firstName: "Ingo", lastName: "Potthof", photo: personIngo, linkedin: "https://www.linkedin.com/in/dr-ingo-potthof-73428652/" },
    ],
  },
  {
    name: "28DIGITAL", location: "23+ offices in Europe", logo: logo28,
    people: [
      { firstName: "Diva", lastName: "Tommei", photo: personDiva, linkedin: "https://www.linkedin.com/in/divatommei/" },
      { firstName: "Andrea", lastName: "Lorenzin", photo: personAndrea, linkedin: "https://www.linkedin.com/in/andrea-lorenzin/" },
    ],
  },
];

const AllianceSection = () => {
  return (
    <section
      id="alliance"
      className="py-20 md:py-24 relative"
      style={{ background: "hsl(220, 56%, 8%)" }}>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(43, 96%, 56%)" }}>
            The Alliance
          </p>
          <h2
            className="text-3xl md:text-5xl font-display font-bold mb-6"
            style={{ color: "hsl(220, 20%, 92%)" }}>
            Six Founding Members, One Vision
          </h2>
          <p
            className="font-body max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "hsl(220, 20%, 60%)" }}>
            Five leading European investors and one innovation ecosystem builder, combining capital, sector expertise and cross-border execution capacity across all Europe.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {funds.map((fund, i) =>
            <motion.div
              key={fund.name}
              className="group relative p-6 rounded-2xl border transition-all duration-500"
              style={{
                background: "hsl(220, 45%, 11%)",
                borderColor: "hsl(220, 30%, 18%)"
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 50% 0%, hsla(43, 80%, 50%, 0.04), transparent 60%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={fund.logo} alt={fund.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold" style={{ color: "hsl(220, 20%, 90%)" }}>
                      {fund.name}
                    </h3>
                    <p className="text-xs font-body" style={{ color: "hsl(220, 20%, 50%)" }}>
                      {fund.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 mt-3 pt-3" style={{ borderTop: "1px solid hsl(220, 30%, 16%)" }}>
                  {fund.people.map((person) => (
                    <a
                      key={person.lastName}
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 group/person"
                    >
                      <img
                        src={person.photo}
                        alt={`${person.firstName} ${person.lastName}`}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <span
                          className="text-[11px] font-body leading-tight group-hover/person:underline"
                          style={{ color: "hsl(220, 20%, 55%)" }}
                        >
                          {person.firstName}
                        </span>
                        <span
                          className="text-[11px] font-body font-bold leading-tight group-hover/person:underline"
                          style={{ color: "hsl(220, 20%, 75%)" }}
                        >
                          {person.lastName}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllianceSection;
