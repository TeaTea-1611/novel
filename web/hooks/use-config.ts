import { FontSize } from "@/registry/font-sizes";
import { LineHeight } from "@/registry/line-heights";
import { TextAlign } from "@/registry/text-aligns";
import { Theme } from "@/registry/themes";
import { Font } from "@/styles/fonts";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ConfigStore {
  theme: Theme["name"];
  font: Font["name"];
  fontSize: FontSize["name"];
  lineHeight: LineHeight["name"];
  textAlign: TextAlign["name"];
  reset: () => void;
  setTheme: (theme: Theme["name"]) => void;
  setFont: (font: Font["name"]) => void;
  setFontSize: (fontSize: FontSize["name"]) => void;
  setLineHeight: (lineHeight: LineHeight["name"]) => void;
  setTextAlign: (textAlign: TextAlign["name"]) => void;
}

export const useConfig = create(
  persist<ConfigStore>(
    (set) => ({
      theme: "default",
      font: "ginto",
      fontSize: "16px",
      lineHeight: "20px",
      textAlign: "left",

      reset() {
        set({
          theme: "default",
          font: "ginto",
          fontSize: "16px",
          lineHeight: "20px",
          textAlign: "left",
        });
      },

      setTheme(theme) {
        set({ theme });
      },

      setFont(font) {
        set({ font });
      },

      setFontSize(fontSize) {
        set({ fontSize });
      },

      setLineHeight(lineHeight) {
        set({ lineHeight });
      },

      setTextAlign(textAlign) {
        set({ textAlign });
      },
    }),
    { name: "config-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
