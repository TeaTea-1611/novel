"use client";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@workspace/ui/lib/utils";
import { FontSize, fontSizes } from "@/registry/font-sizes";
import { LineHeight, lineHeights } from "@/registry/line-heights";
import { TextAlign, textAligns } from "@/registry/text-aligns";
import { Theme, themes } from "@/registry/themes";
import { Font, fonts } from "@/styles/fonts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

const SkeletonLoader = () => (
  <div className="space-y-8">
    <Skeleton className="h-36 w-full" />
    {[...Array(4)].map((_, idx) => (
      <div key={idx} className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-72" />
      </div>
    ))}
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-16 w-72" />
    </div>
  </div>
);

export function AppearanceSettings() {
  const [mounted, setMounted] = useState(false);
  const config = useConfig();
  const { theme: mode, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentFont = useMemo(
    () => fonts.find((font) => font.name === config.font)?.font.className,
    [config.font],
  );

  if (!mounted) return <SkeletonLoader />;

  return (
    <div className="space-y-8">
      <div
        className={cn(
          `theme-${config.theme} ${currentFont}`,
          "flex flex-col space-y-2 bg-muted rounded-md border",
        )}
        style={{
          fontSize: config.fontSize,
          textAlign: config.textAlign,
          lineHeight: config.lineHeight,
        }}
      >
        <div className="w-full rounded-sm bg-background space-y-2 p-2">
          <div className={`text-foreground`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
            <br /> Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
            <br /> Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <Select
          onValueChange={(value: Font["name"]) => config.setFont(value)}
          defaultValue={config.font}
        >
          <SelectTrigger label="Phông chữ">
            <SelectValue placeholder={"Chọn"} />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((option) => (
              <SelectItem key={option.name} value={option.name}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: FontSize["name"]) => config.setFontSize(value)}
          defaultValue={config.fontSize}
        >
          <SelectTrigger label="Cỡ chữ">
            <SelectValue placeholder={"Chọn"} />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((option) => (
              <SelectItem key={option.name} value={option.name}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: LineHeight["name"]) =>
            config.setLineHeight(value)
          }
          defaultValue={config.lineHeight}
        >
          <SelectTrigger label="Chiều cao dòng">
            <SelectValue placeholder={"Chọn"} />
          </SelectTrigger>
          <SelectContent>
            {lineHeights.map((option) => (
              <SelectItem key={option.name} value={option.name}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: TextAlign["name"]) =>
            config.setTextAlign(value)
          }
          defaultValue={config.textAlign}
        >
          <SelectTrigger label="Canh chữ">
            <SelectValue placeholder={"Chọn"} />
          </SelectTrigger>
          <SelectContent>
            {textAligns.map((option) => (
              <SelectItem key={option.name} value={option.name}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md space-y-2">
          <Select onValueChange={setTheme} defaultValue={mode}>
            <SelectTrigger label="Chủ đề" className="w-full">
              <SelectValue placeholder="Chọn chế độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Chế độ sáng</SelectItem>
              <SelectItem value="dark">Chế độ tối</SelectItem>
              <SelectItem value="system">Mặc định hệ thống</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup
            type="single"
            value={config.theme}
            onValueChange={(value: Theme["name"]) => {
              const selectedTheme = themes.find(
                (theme) => theme.name === value,
              );
              if (selectedTheme) {
                config.setTheme(value);
              }
            }}
            className={cn("flex items-center justify-start flex-wrap gap-0.5")}
          >
            {themes.map((theme) => (
              <Tooltip key={theme.name}>
                <TooltipTrigger asChild>
                  <ToggleGroupItem
                    value={theme.name}
                    className={cn(
                      `theme-${theme.name}`,
                      "group flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-transparent p-0 hover:bg-transparent focus-visible:bg-transparent aria-checked:border-primary",
                    )}
                  >
                    <div className="h-6 w-6 overflow-hidden rounded-sm">
                      <div
                        className={cn(
                          "grid h-12 w-12 -translate-x-1/4 -translate-y-1/4 grid-cols-2 overflow-hidden rounded-md transition-all ease-in-out group-hover:rotate-45",
                          theme.name === config.theme
                            ? "rotate-45 group-hover:rotate-0"
                            : "rotate-0",
                        )}
                      >
                        <span className="flex w-6 h-12 bg-background" />
                        <span className="flex w-6 h-12 bg-foreground" />
                        <span className="sr-only">{theme.name}</span>
                      </div>
                    </div>
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side={"bottom"} className="bg-black text-white">
                  {theme.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}
