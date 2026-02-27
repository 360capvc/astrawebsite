// @ts-nocheck
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// world-atlas 110m topojson via CDN
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric codes for European countries — UK (826) intentionally excluded
const EUROPE_ISO = new Set([
  8,   // Albania
  40,  // Austria
  56,  // Belgium
  70,  // Bosnia & Herzegovina
  100, // Bulgaria
  191, // Croatia
  196, // Cyprus
  203, // Czech Republic
  208, // Denmark
  233, // Estonia
  246, // Finland
  250, // France
  276, // Germany
  300, // Greece
  348, // Hungary
  352, // Iceland
  372, // Ireland
  380, // Italy
  428, // Latvia
  440, // Lithuania
  442, // Luxembourg
  807, // North Macedonia
  470, // Malta
  498, // Moldova
  499, // Montenegro
  528, // Netherlands
  578, // Norway
  616, // Poland
  620, // Portugal
  642, // Romania
  688, // Serbia
  703, // Slovakia
  705, // Slovenia
  724, // Spain
  752, // Sweden
  756, // Switzerland
  804, // Ukraine
  112, // Belarus
  268, // Georgia
  51,  // Armenia
  31,  // Azerbaijan
]);

const EuropeMap = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      background: "hsl(220, 56%, 8%)",
      overflow: "hidden",
      pointerEvents: "none",
    }}
  >
    {/* SVG map */}
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 720,
        center: [18, 52],
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies
            .filter((geo) => EUROPE_ISO.has(Number(geo.id)))
            .map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(220, 45%, 14%)"
                stroke="hsla(43, 75%, 48%, 0.45)"
                strokeWidth={0.7}
                style={{
                  default: { outline: "none" },
                  hover:   { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
        }
      </Geographies>
    </ComposableMap>

    {/* Left-side gradient: dark → transparent so hero text stays readable */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to right, hsl(220,56%,8%) 0%, hsla(220,56%,8%,0.75) 30%, hsla(220,56%,8%,0.2) 60%, transparent 100%)",
        pointerEvents: "none",
      }}
    />

    {/* Vignette edges */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 65% 45%, transparent 40%, hsla(220,56%,6%,0.7) 100%)",
        pointerEvents: "none",
      }}
    />

    {/* Bottom fade → solid navy for next sections */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "35vh",
        background:
          "linear-gradient(to bottom, transparent, hsl(220,56%,8%))",
        pointerEvents: "none",
      }}
    />
  </div>
);

export default EuropeMap;
