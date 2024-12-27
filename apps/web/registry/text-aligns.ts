export const textAligns = [
  {
    name: "left",
    label: "Trái",
  },
  {
    name: "center",
    label: "Giữa",
  },
  {
    name: "right",
    label: "Phải",
  },
] as const;

export type TextAlign = (typeof textAligns)[number];
