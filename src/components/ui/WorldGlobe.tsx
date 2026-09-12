"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  geoOrthographic,
  geoPath,
  geoGraticule,
  geoInterpolate,
  geoDistance,
} from "d3-geo";
import * as topojson from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface RegionConfig {
  name: string;
  tagline: string;
  text: string;
  targetRotate: [number, number]; // [lambda, phi]
  countryIds: string[];
  hubs: {
    name: string;
    coords: [number, number]; // [lon, lat]
    isHQ?: boolean;
  }[];
}

const REGIONS: Record<string, RegionConfig> = {
  "Middle East": {
    name: "Middle East",
    tagline: "GLOBAL HEADQUARTERS & GCC CORE",
    text: "UAE | Saudi Arabia | Qatar | Oman | Bahrain | Kuwait",
    targetRotate: [-55, -24],
    countryIds: ["784", "682", "634", "512", "048", "414"], // UAE, Saudi, Qatar, Oman, Bahrain, Kuwait
    hubs: [
      { name: "Dubai (HQ)", coords: [55.2797, 25.2048], isHQ: true },
      { name: "Riyadh", coords: [46.6753, 24.7136] },
      { name: "Doha", coords: [51.531, 25.2854] },
      { name: "Muscat", coords: [58.4059, 23.5859] },
    ],
  },
  "Asia-Pacific": {
    name: "Asia-Pacific",
    tagline: "HIGH-GROWTH TRADE CORRIDORS & CEPA",
    text: "India and key Asia-Pacific markets",
    targetRotate: [-82, -18],
    countryIds: ["356", "702", "392", "360"], // India, Singapore, Japan, Indonesia
    hubs: [
      { name: "Dubai (HQ)", coords: [55.2797, 25.2048], isHQ: true },
      { name: "Mumbai", coords: [72.8777, 19.076] },
      { name: "New Delhi", coords: [77.209, 28.6139] },
      { name: "Singapore", coords: [103.8198, 1.3521] },
      { name: "Tokyo", coords: [139.6503, 35.6762] },
    ],
  },
  Europe: {
    name: "Europe",
    tagline: "TREATY ARCHITECTURES & GLOBAL MINIMUM TAX",
    text: "United Kingdom and key European markets",
    targetRotate: [-8, -48],
    countryIds: ["826", "276", "756", "528", "442", "250", "372"], // UK, Germany, Switzerland, Netherlands, Luxembourg, France, Ireland
    hubs: [
      { name: "Dubai (HQ)", coords: [55.2797, 25.2048], isHQ: true },
      { name: "London", coords: [-0.1278, 51.5074] },
      { name: "Frankfurt", coords: [8.6821, 50.1109] },
      { name: "Zurich", coords: [8.5417, 47.3769] },
      { name: "Amsterdam", coords: [4.9041, 52.3676] },
    ],
  },
};

// Cross-border corridors connecting Dubai HQ to key international financial hubs
const CORRIDOR_ARCS: { from: [number, number]; to: [number, number]; id: string }[] = [
  { from: [55.2797, 25.2048], to: [-0.1278, 51.5074], id: "dubai-london" },
  { from: [55.2797, 25.2048], to: [103.8198, 1.3521], id: "dubai-singapore" },
  { from: [55.2797, 25.2048], to: [72.8777, 19.076], id: "dubai-mumbai" },
  { from: [55.2797, 25.2048], to: [46.6753, 24.7136], id: "dubai-riyadh" },
  { from: [55.2797, 25.2048], to: [8.6821, 50.1109], id: "dubai-frankfurt" },
  { from: [72.8777, 19.076], to: [103.8198, 1.3521], id: "mumbai-singapore" },
];

// Pre-compute TopoJSON features
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const countriesGeo = (topojson.feature(worldData as any, worldData.objects.countries as any) as any).features;
const graticule = geoGraticule().step([20, 20])();

interface WorldGlobeProps {
  activeRegion?: string;
  onSelectRegion?: (region: string) => void;
}

export default function WorldGlobe({
  activeRegion = "Middle East",
  onSelectRegion,
}: WorldGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(activeRegion);
  const [isInteracting, setIsInteracting] = useState(false);

  // Synchronize prop
  useEffect(() => {
    if (activeRegion && activeRegion !== selected) {
      setSelected(activeRegion);
    }
  }, [activeRegion, selected]);

  // Current rotation and target rotation in refs for smooth 60fps loop
  const rotateRef = useRef<[number, number]>([-55, -24]);
  const targetRotateRef = useRef<[number, number]>([-55, -24]);
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef<[number, number]>([0, 0]);
  const rotateStartRef = useRef<[number, number]>([-55, -24]);
  const autoRotateRef = useRef(true);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pulsePhaseRef = useRef(0);

  const handleSelect = useCallback(
    (key: string) => {
      setSelected(key);
      onSelectRegion?.(key);
      const reg = REGIONS[key];
      if (reg) {
        targetRotateRef.current = [...reg.targetRotate];
        autoRotateRef.current = false;
        if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
        autoRotateTimerRef.current = setTimeout(() => {
          autoRotateRef.current = true;
        }, 4500);
      }
    },
    [onSelectRegion],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = container.clientWidth || 560;
    let height = width;
    let animId: number;

    const updateDimensions = () => {
      const w = container.clientWidth || 560;
      width = w;
      height = w;
      const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${w}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const ro = new ResizeObserver(updateDimensions);
    ro.observe(container);

    // Pre-calculate interpolated great circle line strings
    const interpolatedCorridors = CORRIDOR_ARCS.map((arc) => {
      const interpolator = geoInterpolate(arc.from, arc.to);
      const points = Array.from({ length: 45 }, (_, i) => interpolator(i / 44));
      return {
        id: arc.id,
        from: arc.from,
        to: arc.to,
        interpolator,
        lineString: { type: "LineString", coordinates: points },
      };
    });

    const activeConfig = REGIONS[selected] || REGIONS["Middle East"];
    const activeCountrySet = new Set(activeConfig.countryIds);
    const allRegionCountrySet = new Set(
      Object.values(REGIONS).flatMap((r) => r.countryIds),
    );

    const render = () => {
      pulsePhaseRef.current = (pulsePhaseRef.current + 0.02) % (Math.PI * 2);

      // Smooth camera interpolation
      if (!isDraggingRef.current) {
        if (!autoRotateRef.current) {
          // Lerp to target angles
          const [tLambda, tPhi] = targetRotateRef.current;
          let diffLambda = tLambda - rotateRef.current[0];
          diffLambda = ((((diffLambda + 180) % 360) + 360) % 360) - 180;
          rotateRef.current[0] += diffLambda * 0.07;
          rotateRef.current[1] += (tPhi - rotateRef.current[1]) * 0.07;
        } else {
          // Gentle ambient rotation
          rotateRef.current[0] -= 0.12;
          const targetPhi = (REGIONS[selected]?.targetRotate[1] ?? -24);
          rotateRef.current[1] += (targetPhi - rotateRef.current[1]) * 0.03;
        }
      }

      const radius = width * 0.44;
      const center: [number, number] = [width / 2, height / 2];

      const projection = geoOrthographic()
        .scale(radius)
        .translate(center)
        .clipAngle(90)
        .precision(0.3)
        .rotate([rotateRef.current[0], rotateRef.current[1], 0]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const path = geoPath(projection, ctx as any);

      ctx.clearRect(0, 0, width, height);

      // 1. Atmospheric Outer Glow
      const glowGrad = ctx.createRadialGradient(
        center[0],
        center[1],
        radius * 0.88,
        center[0],
        center[1],
        radius * 1.14,
      );
      glowGrad.addColorStop(0, "rgba(224, 0, 25, 0.04)");
      glowGrad.addColorStop(0.45, "rgba(235, 233, 228, 0.35)");
      glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(center[0], center[1], radius * 1.14, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Spherical Base with Directional Lighting
      const sphereGrad = ctx.createRadialGradient(
        center[0] - radius * 0.38,
        center[1] - radius * 0.38,
        radius * 0.1,
        center[0],
        center[1],
        radius,
      );
      sphereGrad.addColorStop(0, "#ffffff");
      sphereGrad.addColorStop(0.55, "#f7f6f3");
      sphereGrad.addColorStop(0.85, "#ebe8e1");
      sphereGrad.addColorStop(1, "#dcd8ce");

      ctx.save();
      ctx.beginPath();
      ctx.arc(center[0], center[1], radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "#d6d2c8";
      ctx.stroke();
      ctx.clip(); // Clip landmasses cleanly to spherical curvature

      // 3. Latitude / Longitude Graticules
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(200, 196, 188, 0.38)";
      ctx.lineWidth = 0.55;
      ctx.stroke();

      // 4. Countries
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      countriesGeo.forEach((country: any) => {
        const id = country.id;
        const isActive = activeCountrySet.has(id);
        const isPartner = allRegionCountrySet.has(id) && !isActive;

        ctx.beginPath();
        path(country);

        if (isActive) {
          // Signature Taxmetryx crimson red
          ctx.fillStyle = "#e00019";
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (isPartner) {
          // Soft coordinated rose
          ctx.fillStyle = "#f3c7c2";
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          // Crisp warm alabaster landmass
          ctx.fillStyle = "#e5e3de";
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      });

      // 5. Great Circle Flight / Trade Corridor Arcs
      const centerCoords = projection.invert?.(center) || [0, 0];

      interpolatedCorridors.forEach((arc) => {
        const d1 = geoDistance(centerCoords, arc.from);
        const d2 = geoDistance(centerCoords, arc.to);
        const isVisible = d1 < Math.PI / 2 || d2 < Math.PI / 2;

        if (!isVisible) return;

        // Solid, elegant curved arc line
        ctx.beginPath();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        path(arc.lineString as any);
        ctx.strokeStyle = "rgba(138, 146, 149, 0.75)";
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Traveling light pulse along the corridor
        const tPulse = (pulsePhaseRef.current / (Math.PI * 2) + (arc.id.length * 0.17)) % 1;
        const pulseCoord = arc.interpolator(tPulse);
        if (geoDistance(centerCoords, pulseCoord) < Math.PI / 2) {
          const pt = projection(pulseCoord);
          if (pt) {
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 3, 0, Math.PI * 2);
            ctx.fillStyle = "#e00019";
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      });

      // 6. Hub Pins (clean dots with zero text collision)
      const allHubs = [
        ...REGIONS["Middle East"].hubs,
        ...REGIONS["Asia-Pacific"].hubs.filter((h) => !h.isHQ),
        ...REGIONS["Europe"].hubs.filter((h) => !h.isHQ),
      ];

      allHubs.forEach((hub) => {
        const isVisible = geoDistance(centerCoords, hub.coords) < Math.PI / 2 - 0.04;
        if (!isVisible) return;

        const pt = projection(hub.coords);
        if (!pt) return;

        const isHQ = hub.isHQ;
        const isCurrentRegion = activeConfig.hubs.some((h) => h.coords[0] === hub.coords[0] && h.coords[1] === hub.coords[1]);

        if (isHQ) {
          // Dubai HQ: Pulsing beacon ring + red dot
          const pulseR = 7 + Math.sin(pulsePhaseRef.current) * 3;
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], pulseR + 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(224, 0, 25, 0.16)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt[0], pt[1], 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#e00019";
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.8;
          ctx.stroke();
        } else {
          // Regional Hub Pin
          const pinR = isCurrentRegion ? 4 : 3;
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], pinR, 0, Math.PI * 2);
          ctx.fillStyle = isCurrentRegion ? "#e00019" : "#8a9295";
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      });

      // 7. Subtle Inner Sphere Rim Shadow
      const rimShadow = ctx.createRadialGradient(
        center[0],
        center[1],
        radius * 0.75,
        center[0],
        center[1],
        radius,
      );
      rimShadow.addColorStop(0, "rgba(0, 0, 0, 0)");
      rimShadow.addColorStop(0.85, "rgba(71, 65, 55, 0.05)");
      rimShadow.addColorStop(1, "rgba(71, 65, 55, 0.2)");

      ctx.fillStyle = rimShadow;
      ctx.beginPath();
      ctx.arc(center[0], center[1], radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
    };
  }, [selected]);

  // Pointer Drag Handlers
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsInteracting(true);
    autoRotateRef.current = false;
    pointerStartRef.current = [e.clientX, e.clientY];
    rotateStartRef.current = [...rotateRef.current];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - pointerStartRef.current[0];
    const dy = e.clientY - pointerStartRef.current[1];

    const newLambda = rotateStartRef.current[0] + dx * 0.38;
    const newPhi = Math.max(-65, Math.min(65, rotateStartRef.current[1] - dy * 0.38));

    rotateRef.current = [newLambda, newPhi];
    targetRotateRef.current = [newLambda, newPhi];
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
    autoRotateTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        autoRotateRef.current = true;
      }
    }, 4000);
  };

  return (
    <div className="reference-map globe-wrapper">
      {/* Main Stage: 3D Globe + Right-Side Simple Line Controls */}
      <div className="globe-stage">
        <div
          ref={containerRef}
          className={`globe-canvas-container ${isInteracting ? "is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Decorative dashed boundary circle ring aligned with globe center */}
          <div className="globe-orbit-ring" aria-hidden="true" />

          <canvas
            ref={canvasRef}
            className="globe-canvas"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>

        {/* Region Selector Buttons: Right Side with Unique Luxury Button Style */}
        <div className="globe-side-controls">
          {Object.entries(REGIONS).map(([key, reg], idx) => {
            const isPressed = selected === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isPressed}
                onClick={() => handleSelect(key)}
                className={`globe-side-btn ${isPressed ? "is-active" : ""}`}
              >
                <div className="globe-side-card-accent" aria-hidden="true" />
                <div className="globe-side-header">
                  <div className="globe-side-header-left">
                    <span className="globe-side-num">0{idx + 1}</span>
                    <strong className="globe-side-title">{reg.name}</strong>
                  </div>
                  <span
                    className={`globe-side-action ${isPressed ? "is-active" : ""}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </div>
                <span className="globe-side-desc">{reg.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* In Button Place: 3 Stats with Count Animation Style */}
      <div className="globe-bottom-stats">
        <div className="globe-stat-item">
          <strong className="globe-stat-value">
            <AnimatedCounter value={3} />
          </strong>
          <span className="globe-stat-label">REGIONS</span>
        </div>
        <div className="globe-stat-item">
          <strong className="globe-stat-value">
            <AnimatedCounter value={10} suffix="+" />
          </strong>
          <span className="globe-stat-label">KEY MARKETS</span>
        </div>
        <div className="globe-stat-item">
          <strong className="globe-stat-value">
            <AnimatedCounter value={1} />
          </strong>
          <span className="globe-stat-label">INTEGRATED PERSPECTIVE</span>
        </div>
      </div>
    </div>
  );
}
