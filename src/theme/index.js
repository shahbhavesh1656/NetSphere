import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 🎨 Base colors
 */
const baseColors = {
  primaryBlue: "#3B82F6",
  neonPurple: "#9B51E0",
  cyanGlow: "#00E5FF",
  neonPink: "#FF2D95",
  multiBlue: "#2D9CDB",
  white: "#FFFFFF",
  gray: "#F2F2F2",
  charcoal: "#1C1C1C",
};

/**
 * 🌞 Light Mode Palette
 */
const lightPalette = {
  background: baseColors.white,
  surface: baseColors.gray,
  cardGlass: "rgba(0,0,0,0.05)",
  text: "#111111",
  textSecondary: "#444444",
  primary: baseColors.multiBlue,
  accent: baseColors.cyanGlow,
  border: "rgba(0,0,0,0.12)",
  shadow: "#1E293B",
  textOnPrimary: "#FFFFFF",
};

/**
 * 🌙 Dark Mode Palette
 */
const darkPalette = {
  background: baseColors.charcoal,
  surface: "#111218",
  cardGlass: "rgba(255,255,255,0.08)",
  text: "#F5F6FF",
  textSecondary: "#B8B9D9",
  primary: baseColors.neonPurple,
  accent: baseColors.neonPink,
  border: "rgba(255,255,255,0.14)",
  shadow: "#000000",
  textOnPrimary: "#FFFFFF",
};

/**
 * ✍️ Typography
 */
const typography = {
  headingXL: { fontSize: 28, fontWeight: "800", letterSpacing: 0.8 },
  headingL: { fontSize: 22, fontWeight: "700", letterSpacing: 0.5 },
  body: { fontSize: 16, fontWeight: "400" },
  subtle: { fontSize: 14, fontWeight: "400" },
};

/**
 * 🔲 Radii
 */
const radii = {
  s: 10,
  m: 16,
  l: 24,
  xl: 28,
};

/**
 * 🌫️ Shadows
 */
const shadows = {
  soft: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  neon: (color) => ({
    shadowColor: color,
    shadowOpacity: 0.9,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  }),
};

/**
 * 🌍 Theme Context
 */
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();
  const [mode, setMode] = useState(systemScheme || "light");

  useEffect(() => {
    AsyncStorage.getItem("themeMode").then((saved) => {
      if (saved === "light" || saved === "dark") setMode(saved);
    });

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setMode(colorScheme || "light");
    });

    return () => sub && sub.remove && sub.remove();
  }, []);

  const value = useMemo(() => {
    const palette = mode === "dark" ? darkPalette : lightPalette;

    const toggleMode = async () => {
      const next = mode === "dark" ? "light" : "dark";
      setMode(next);
      await AsyncStorage.setItem("themeMode", next);
    };

    return { mode, setMode: toggleMode, colors: palette, typography, radii, shadows, baseColors };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
