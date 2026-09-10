"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Jurisdiction {
  code: string;
  name: string;
  region: string;
}

export const JURISDICTIONS: Jurisdiction[] = [
  { code: "UAE", name: "United Arab Emirates", region: "Middle East" },
  { code: "KSA", name: "Kingdom of Saudi Arabia", region: "Middle East" },
  { code: "UK & EU", name: "United Kingdom & Europe", region: "Europe" },
  { code: "APAC", name: "Asia-Pacific & India", region: "Asia-Pacific" },
];

interface JurisdictionContextType {
  jurisdiction: Jurisdiction;
  setJurisdiction: (j: Jurisdiction) => void;
  filterActive: boolean;
  clearFilter: () => void;
}

const JurisdictionContext = createContext<JurisdictionContextType>({
  jurisdiction: JURISDICTIONS[0],
  setJurisdiction: () => {},
  filterActive: false,
  clearFilter: () => {},
});

export function JurisdictionProvider({ children }: { children: React.ReactNode }) {
  const [jurisdiction, setJurisdictionState] = useState<Jurisdiction>(JURISDICTIONS[0]);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("taxmetryx_jurisdiction");
      if (saved) {
        const found = JURISDICTIONS.find((j) => j.code === saved);
        if (found) {
          setJurisdictionState(found);
          setFilterActive(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const setJurisdiction = (j: Jurisdiction) => {
    setJurisdictionState(j);
    setFilterActive(true);
    try {
      localStorage.setItem("taxmetryx_jurisdiction", j.code);
    } catch {
      // ignore
    }
  };

  const clearFilter = () => {
    setFilterActive(false);
  };

  return (
    <JurisdictionContext.Provider
      value={{
        jurisdiction,
        setJurisdiction,
        filterActive,
        clearFilter,
      }}
    >
      {children}
    </JurisdictionContext.Provider>
  );
}

export function useJurisdiction() {
  return useContext(JurisdictionContext);
}
