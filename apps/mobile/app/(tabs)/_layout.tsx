import { Icons } from "@/components/icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/use-theme";
import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export default function TabLayout() {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();

  return (
    <Tabs>
      <TabSlot
        style={[
          styles.tabSlot,
          {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.light.background,
          },
        ]}
      />
      <TabList
        style={[
          styles.tabList,
          {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.light.background,
            shadowColor: isDarkMode ? Colors.dark.shadow : Colors.light.shadow,
          },
        ]}
      >
        <TabTrigger
          name={"bookmark"}
          href={"/bookmark"}
          style={({ hovered, pressed }) => [
            styles.tabButton,
            hovered && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(10, 126, 164, 0.05)",
            },
            pressed && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(10, 126, 164, 0.15)",
            },
          ]}
        >
          <Animated.View>
            <Icons.library
              stroke={
                isDarkMode
                  ? Colors.dark.tabIconDefault
                  : Colors.light.tabIconDefault
              }
              width={24}
              height={24}
            />
          </Animated.View>
        </TabTrigger>
        <TabTrigger
          name={"home"}
          href={"/"}
          style={({ hovered, pressed }) => [
            styles.tabButton,
            hovered && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(10, 126, 164, 0.05)",
            },
            pressed && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(10, 126, 164, 0.15)",
            },
          ]}
        >
          <Animated.View>
            <Icons.home
              stroke={
                isDarkMode
                  ? Colors.dark.tabIconDefault
                  : Colors.light.tabIconDefault
              }
              width={24}
              height={24}
            />
          </Animated.View>
        </TabTrigger>
        <TabTrigger
          name={"ranking"}
          href={"/ranking"}
          style={({ hovered, pressed }) => [
            styles.tabButton,
            hovered && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(10, 126, 164, 0.05)",
            },
            pressed && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(10, 126, 164, 0.15)",
            },
          ]}
        >
          <Animated.View>
            <Icons.star
              stroke={
                isDarkMode
                  ? Colors.dark.tabIconDefault
                  : Colors.light.tabIconDefault
              }
              width={24}
              height={24}
            />
          </Animated.View>
        </TabTrigger>
        <TabTrigger
          name={"settings"}
          href={"/account"}
          style={({ hovered, pressed }) => [
            styles.tabButton,
            hovered && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(10, 126, 164, 0.05)",
            },
            pressed && {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(10, 126, 164, 0.15)",
            },
          ]}
        >
          <Animated.View>
            <Icons.settings
              stroke={
                isDarkMode
                  ? Colors.dark.tabIconDefault
                  : Colors.light.tabIconDefault
              }
              width={24}
              height={24}
            />
          </Animated.View>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabSlot: {
    paddingBottom: 64,
  },
  tabList: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    zIndex: 50,
    overflow: "hidden",
  },
  tabButton: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    height: 56,
  },
});
