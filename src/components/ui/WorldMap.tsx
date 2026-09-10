"use client";
import { useState } from "react";
import map from "@/data/world-map.json";
export default function WorldMap() {
  const [active, setActive] = useState("Middle East");
  const hub = map.nodes[0].point;
  return (
    <div className="reference-map">
      <svg
        viewBox="0 0 800 620"
        role="img"
        aria-label="Regional coverage across the Middle East, Europe and Asia-Pacific"
      >
        <circle cx="400" cy="310" r="307" fill="none" stroke="#e9e8e6" />
        <g>
          {map.countries.map((c, idx) => (
            <path
              key={c.id || `country-${idx}`}
              d={c.d!}
              fill={
                c.region === active
                  ? "#e20b22"
                  : c.region
                    ? "#e9b5b0"
                    : "#e5e6e5"
              }
              stroke="#fff"
              strokeWidth=".6"
            />
          ))}
        </g>
        {map.nodes.slice(1).map((n) => (
          <path
            key={n.name}
            d={`M ${hub[0]},${hub[1]} Q ${(hub[0] + n.point[0]) / 2},${Math.min(hub[1], n.point[1]) - 110} ${n.point[0]},${n.point[1]}`}
            fill="none"
            stroke="#8a9295"
            strokeWidth="1.2"
          />
        ))}
        {map.nodes.map((n) => (
          <g key={n.name}>
            <circle
              cx={n.point[0]}
              cy={n.point[1]}
              r="10"
              fill="#e20b22"
              opacity=".12"
            />
            <circle
              cx={n.point[0]}
              cy={n.point[1]}
              r="4.5"
              fill="#e20b22"
              stroke="#fff"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </svg>
      <div className="map-region-controls">
        {map.nodes.map((n) => (
          <button
            key={n.name}
            type="button"
            aria-pressed={active === n.name}
            onClick={() => setActive(n.name)}
            onMouseEnter={() => setActive(n.name)}
            onFocus={() => setActive(n.name)}
          >
            <strong>{n.name}</strong>
            <span>{n.text}</span>
          </button>
        ))}
      </div>
      <span className="map-motto micro-copy">
        PEOPLE.
        <br />
        PERSPECTIVE.
        <br />
        POSSIBILITIES.
        <br />
        BEYOND BORDERS.
      </span>
    </div>
  );
}
