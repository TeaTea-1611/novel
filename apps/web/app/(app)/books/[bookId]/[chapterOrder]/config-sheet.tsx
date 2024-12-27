"use client";

import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@workspace/ui/lib/utils";
import { FontSize, fontSizes } from "@/registry/font-sizes";
import { LineHeight, lineHeights } from "@/registry/line-heights";
import { TextAlign, textAligns } from "@/registry/text-aligns";
import { Theme, themes } from "@/registry/themes";
import { Font, fonts } from "@/styles/fonts";
import { XIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export function ConfigSheet({ children }: Props) {
  const config = useConfig();
  const { theme: mode, setTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="max-w-full p-4 overflow-y-auto md:max-w-md lg:max-w-lg">
        <SheetHeader>
          <div className="flex justify-between">
            <SheetTitle className="text-base leading-5 line-clamp-2">
              Cấu hình
            </SheetTitle>
            <SheetClose
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "size-8 p-2",
                }),
              )}
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <SheetDescription>Cài đặt đọc truyện</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 mt-4">
          <Select
            value={config.font}
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
            value={config.fontSize}
            onValueChange={(value: FontSize["name"]) =>
              config.setFontSize(value)
            }
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
            value={config.lineHeight}
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
            value={config.textAlign}
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
          <div className="space-y-2 rounded-md">
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
              className={cn(
                "flex items-center justify-start flex-wrap gap-0.5",
              )}
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
                      <div className="w-6 h-6 overflow-hidden rounded-sm">
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
                  <TooltipContent
                    side={"bottom"}
                    className="text-white bg-black"
                  >
                    {theme.label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </ToggleGroup>
          </div>
          <Button variant={"outline"} onClick={() => config.reset()}>
            Mặc định
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
