export const lineHeights = [
  {
    name: "12px",
    label: "12px",
  },
  {
    name: "16px",
    label: "16px",
  },
  {
    name: "20px",
    label: "20px",
  },
  {
    name: "24px",
    label: "24px",
  },
  {
    name: "28px",
    label: "28px",
  },
  {
    name: "32px",
    label: "32px",
  },
  {
    name: "36px",
    label: "36px",
  },
  {
    name: "40px",
    label: "40px",
  },
] as const;

export type LineHeight = (typeof lineHeights)[number];
