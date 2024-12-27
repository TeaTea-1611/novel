import localFont from "next/font/local";

export const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const ginto = localFont({
  src: "../public/fonts/Ginto.woff2",
  variable: "--font-ginto",
  weight: "100 900",
});

export const inter = localFont({
  src: "../public/fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

export const firaCodeVF = localFont({
  src: "../public/fonts/FiraCode-VF.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

export const cascadiaCode = localFont({
  src: "../public/fonts/CascadiaCode.woff2",
  variable: "--font-cascadia-code",
  weight: "100 900",
});

export const fonts = [
  {
    name: "geistSans",
    label: "Geist Sans",
    font: geistSans,
  },
  {
    name: "geistMono",
    label: "Geist Mono",
    font: geistMono,
  },
  {
    name: "ginto",
    label: "Ginto",
    font: ginto,
  },
] as const;

export type Font = (typeof fonts)[number];
