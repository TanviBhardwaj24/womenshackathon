"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Persona, PERSONAS, DEFAULT_PERSONA } from "@/types/persona";

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  personas: Persona[];
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

const STORAGE_KEY = "empowher-persona";

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(() => {
    if (typeof window === "undefined") return DEFAULT_PERSONA;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const id = JSON.parse(stored);
        return PERSONAS.find((p) => p.id === id) || DEFAULT_PERSONA;
      }
    } catch {}
    return DEFAULT_PERSONA;
  });

  const setPersona = useCallback((p: Persona) => {
    setPersonaState(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p.id));
  }, []);

  return (
    <PersonaContext.Provider value={{ persona, setPersona, personas: PERSONAS }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used within PersonaProvider");
  return ctx;
}
