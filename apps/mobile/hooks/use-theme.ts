import { useThemeStore } from "@/stores/theme-store";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const { themeMode, setThemeMode } = useThemeStore();

  const isDarkMode =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  return {
    isDarkMode,
    themeMode,
    setThemeMode,
  };
};
