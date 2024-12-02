export const themes = [
  {
    name: "default",
    label: "Mặc định",
    cssVars: {
      light: {
        background: "20 30% 96%",
        foreground: "24 7% 20%",
      },
      dark: {
        background: "225 40% 8%",
        foreground: "210 40% 98%",
      },
    },
  },
  {
    name: "classic",
    label: "Cổ điển",
    cssVars: {
      light: {
        background: "44 35% 87%",
        foreground: "223 36% 14%",
      },
      dark: {
        background: "240 3% 16%",
        foreground: "220 2% 65%",
      },
    },
  },
  {
    name: "modern",
    label: "Hiện đại",
    cssVars: {
      light: {
        background: "210 22% 95%",
        foreground: "210 25% 10%",
      },
      dark: {
        background: "210 30% 15%",
        foreground: "210 10% 85%",
      },
    },
  },
  {
    name: "retro",
    label: "Retro",
    cssVars: {
      light: {
        background: "35 70% 90%",
        foreground: "35 80% 20%",
      },
      dark: {
        background: "35 40% 20%",
        foreground: "35 15% 90%",
      },
    },
  },
  {
    name: "midnight",
    label: "Nửa đêm",
    cssVars: {
      light: {
        background: "240 20% 90%",
        foreground: "240 10% 30%",
      },
      dark: {
        background: "240 20% 10%",
        foreground: "240 30% 90%",
      },
    },
  },
  {
    name: "solarized",
    label: "Solarized",
    cssVars: {
      light: {
        background: "180 30% 95%",
        foreground: "180 30% 25%",
      },
      dark: {
        background: "180 30% 15%",
        foreground: "180 15% 80%",
      },
    },
  },
  {
    name: "pastel",
    label: "Pastel",
    cssVars: {
      light: {
        background: "330 20% 98%",
        foreground: "330 40% 20%",
      },
      dark: {
        background: "330 30% 20%",
        foreground: "330 10% 90%",
      },
    },
  },
  {
    name: "neon",
    label: "Neon",
    cssVars: {
      light: {
        background: "100 30% 92%",
        foreground: "100 50% 10%",
      },
      dark: {
        background: "100 20% 10%",
        foreground: "100 50% 90%",
      },
    },
  },
  {
    name: "autumn",
    label: "Thu",
    cssVars: {
      light: {
        background: "30 35% 90%",
        foreground: "30 40% 20%",
      },
      dark: {
        background: "30 25% 15%",
        foreground: "30 10% 85%",
      },
    },
  },
  {
    name: "forest",
    label: "Rừng",
    cssVars: {
      light: {
        background: "120 25% 95%",
        foreground: "120 40% 25%",
      },
      dark: {
        background: "120 30% 20%",
        foreground: "120 15% 80%",
      },
    },
  },
  {
    name: "ice",
    label: "Băng giá",
    cssVars: {
      light: {
        background: "180 25% 95%",
        foreground: "180 35% 30%",
      },
      dark: {
        background: "180 20% 15%",
        foreground: "180 15% 85%",
      },
    },
  },
] as const;

export type Theme = (typeof themes)[number];
