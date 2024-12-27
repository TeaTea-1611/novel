import { Colors } from "@/constants/Colors";
import { useTheme } from "./use-theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const { isDarkMode } = useTheme();
  const colorFromProps = props[isDarkMode ? "dark" : "light"];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[isDarkMode ? "dark" : "light"][colorName];
  }
}
