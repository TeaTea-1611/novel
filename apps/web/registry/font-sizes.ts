export const fontSizes = [
  {
    name: "14px",
    label: "14px",
  },
  {
    name: "16px",
    label: "16px",
  },
  {
    name: "18px",
    label: "18px",
  },
  {
    name: "20px",
    label: "20px",
  },
  {
    name: "22px",
    label: "22px",
  },
  {
    name: "24px",
    label: "24px",
  },
  {
    name: "26px",
    label: "26px",
  },
  {
    name: "28px",
    label: "28px",
  },
] as const;

export type FontSize = (typeof fontSizes)[number];
