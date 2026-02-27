// @ts-nocheck – three@0.160 has no bundled types; @types/three@0.183 (installed by react-three deps) is incompatible. SWC build is unaffected.
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Helper: lat/lon → 3D point on sphere surface
const latLonToVec3 = (lon: number, lat: number, r: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lon * (Math.PI / 180);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
};

// Expanding + fading pulse ring at a city position
const PulseRing = ({
  position,
  delay = 0,
}: {
  position: THREE.Vector3;
  delay?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(delay);

  // Orient ring so its normal points outward from the sphere
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      position.clone().normalize()
    );
    return q;
  }, [position]);

  useFrame((_, delta) => {
    t.current += delta;
    const phase = (t.current % 2.8) / 2.8; // 0 → 1 over 2.8s
    if (ref.current) {
      ref.current.scale.setScalar(1 + phase * 2.8);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        Math.max(0, (1 - phase) * 0.45);
    }
  });

  return (
    <mesh ref={ref} position={position} quaternion={quaternion}>
      <ringGeometry args={[0.04, 0.056, 32]} />
      <meshBasicMaterial
        color="#d4a843"
        transparent
        opacity={0.45}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Curved arc connecting two points on the sphere surface
const Arc = ({
  from,
  to,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
}) => {
  const { count, arr } = useMemo(() => {
    const mid = from
      .clone()
      .add(to)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(from.length() * 1.3);
    const pts = new THREE.QuadraticBezierCurve3(from, mid, to).getPoints(50);
    return {
      count: pts.length,
      arr: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])),
    };
  }, [from, to]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={arr}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#c9933a" transparent opacity={0.22} />
    </line>
  );
};

const Globe = () => {
  const R = 2;

  // Major European tech hubs [lon, lat]
  const cityCoords = useMemo<[number, number][]>(
    () => [
      [2.35, 48.86],   // 0  Paris
      [13.4, 52.52],   // 1  Berlin
      [-0.12, 51.51],  // 2  London
      [12.5, 41.9],    // 3  Rome
      [-3.7, 40.42],   // 4  Madrid
      [18.07, 59.33],  // 5  Stockholm
      [4.9, 52.37],    // 6  Amsterdam
      [16.37, 48.21],  // 7  Vienna
      [23.73, 37.98],  // 8  Athens
      [21.01, 52.23],  // 9  Warsaw
      [14.42, 50.08],  // 10 Prague
      [24.94, 60.17],  // 11 Helsinki
      [9.19, 45.46],   // 12 Milan
      [11.58, 48.14],  // 13 Munich
      [8.55, 47.37],   // 14 Zurich
      [-9.14, 38.74],  // 15 Lisbon
      [12.57, 55.68],  // 16 Copenhagen
      [10.75, 59.91],  // 17 Oslo
    ],
    []
  );

  const hubPositions = useMemo(
    () => cityCoords.map(([lon, lat]) => latLonToVec3(lon, lat, R + 0.03)),
    [cityCoords]
  );

  // Connection pairs between cities
  const arcPairs = useMemo<[number, number][]>(
    () => [
      [0, 2],  // Paris – London
      [0, 1],  // Paris – Berlin
      [0, 6],  // Paris – Amsterdam
      [1, 5],  // Berlin – Stockholm
      [1, 13], // Berlin – Munich
      [1, 9],  // Berlin – Warsaw
      [2, 6],  // London – Amsterdam
      [5, 11], // Stockholm – Helsinki
      [5, 16], // Stockholm – Copenhagen
      [6, 7],  // Amsterdam – Vienna
      [7, 10], // Vienna – Prague
      [13, 14],// Munich – Zurich
      [12, 14],// Milan – Zurich
      [3, 12], // Rome – Milan
      [4, 15], // Madrid – Lisbon
      [16, 17],// Copenhagen – Oslo
    ],
    []
  );

  // Lat/lon grid lines
  const gridLines = useMemo(() => {
    const r = R + 0.01;
    const result: { count: number; arr: Float32Array }[] = [];

    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: number[] = [];
      for (let lon = 0; lon <= 360; lon += 3) {
        const v = latLonToVec3(lon, lat, r);
        pts.push(v.x, v.y, v.z);
      }
      result.push({ count: pts.length / 3, arr: new Float32Array(pts) });
    }
    for (let lon = 0; lon < 360; lon += 20) {
      const pts: number[] = [];
      for (let lat = -90; lat <= 90; lat += 3) {
        const v = latLonToVec3(lon, lat, r);
        pts.push(v.x, v.y, v.z);
      }
      result.push({ count: pts.length / 3, arr: new Float32Array(pts) });
    }
    return result;
  }, []);

  // Simplified Europe coastline outline
  const { europeCount, europeArr } = useMemo(() => {
    const r = R + 0.02;
    const coords: [number, number][] = [
      // Iberia west
      [-9.5, 38.7], [-9, 40], [-8.7, 41], [-8, 42], [-5, 43.5],
      // Spain north coast
      [-2, 43.5], [0, 43.3], [1.5, 43.1],
      // France / Riviera
      [3, 43.5], [5, 43.4], [7.3, 43.8],
      // Italy top & east coast
      [9, 45], [13, 46], [15, 47], [17, 48], [18, 48.5],
      // Central-Eastern Europe
      [21, 50], [23, 52],
      // Baltic
      [21, 54], [18.5, 55.3], [14.2, 54.2], [12.9, 55.7], [10.6, 57.7],
      // Scandinavia west
      [10.5, 58], [9, 57.5], [8.2, 57], [8.1, 55.5], [9, 54.5],
      [10.5, 55], [12, 56], [10, 57.5], [12, 58],
      // Norway / Sweden
      [15, 59], [18, 60], [20, 62], [22, 64], [25, 66], [28, 68], [30, 70],
      // Russia / Finland border going south
      [32, 68], [35, 66], [38, 64], [40, 62],
      // Black Sea / Eastern Europe south
      [42, 58], [40, 55], [38, 52], [35, 48], [32, 45],
      [30, 42], [28, 40], [26, 38], [24, 36], [22, 35],
      // Mediterranean south
      [20, 36], [18, 38], [16, 39],
      // Italian boot tip & west coast
      [14, 38], [12, 37.5], [10, 38], [8, 39],
      // French coast back west
      [5, 40], [3, 41], [0, 40], [-3, 38],
      // Gibraltar / south Iberia
      [-5, 36.5], [-7, 37], [-9.5, 38.7],
    ];
    const pts = coords.map(([lon, lat]) => latLonToVec3(lon, lat, r));
    return {
      europeCount: pts.length,
      europeArr: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])),
    };
  }, []);

  return (
    <group rotation={[0.15, -0.3, 0.1]}>
      {/* Globe body */}
      <Sphere args={[R, 64, 64]}>
        <meshPhongMaterial
          color="#07111f"
          transparent
          opacity={0.92}
          shininess={15}
        />
      </Sphere>

      {/* Atmospheric haze – inner */}
      <Sphere args={[R * 1.04, 64, 64]}>
        <meshPhongMaterial
          color="#1a4a8c"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Atmospheric haze – outer glow */}
      <Sphere args={[R * 1.09, 64, 64]}>
        <meshPhongMaterial
          color="#0d2040"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Lat/lon grid */}
      {gridLines.map(({ count, arr }, i) => (
        <line key={`grid-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={count}
              array={arr}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1e3a5f" transparent opacity={0.14} />
        </line>
      ))}

      {/* Europe outline */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={europeCount}
            array={europeArr}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#d4a843" transparent opacity={0.78} />
      </line>

      {/* Connection arcs */}
      {arcPairs.map(([a, b], i) => (
        <Arc key={`arc-${i}`} from={hubPositions[a]} to={hubPositions[b]} />
      ))}

      {/* City dots */}
      {hubPositions.map((pos, i) => (
        <mesh key={`dot-${i}`} position={pos}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial color="#d4a843" />
        </mesh>
      ))}

      {/* Double-layered pulse rings on the 9 most prominent hubs */}
      {hubPositions.slice(0, 9).flatMap((pos, i) => [
        <PulseRing key={`pr1-${i}`} position={pos} delay={i * 0.38} />,
        <PulseRing key={`pr2-${i}`} position={pos} delay={i * 0.38 + 1.4} />,
      ])}
    </group>
  );
};

const EuropeGlobe = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 3, 5]} intensity={1.0} color="#e8d5a3" />
        <directionalLight position={[-5, -2, -3]} intensity={0.35} color="#4a7ab5" />
        <pointLight position={[0, 2, 5]} intensity={0.55} color="#d4a843" />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.45}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
    </div>
  );
};

export default EuropeGlobe;
