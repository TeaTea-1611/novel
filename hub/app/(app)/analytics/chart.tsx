"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// const chartData = [
//   { date: "2024-06-06", read: 294, comment: 250, review: 255 },
//   { date: "2024-06-07", read: 323, comment: 370, review: 375 },
//   { date: "2024-06-08", read: 385, comment: 320, review: 325 },
//   { date: "2024-06-09", read: 438, comment: 480, review: 485 },
//   { date: "2024-06-10", read: 155, comment: 200, review: 205 },
//   { date: "2024-06-11", read: 92, comment: 150, review: 155 },
//   { date: "2024-06-12", read: 492, comment: 420, review: 425 },
//   { date: "2024-06-13", read: 81, comment: 130, review: 135 },
//   { date: "2024-06-14", read: 426, comment: 380, review: 385 },
//   { date: "2024-06-15", read: 307, comment: 350, review: 355 },
//   { date: "2024-06-16", read: 371, comment: 310, review: 315 },
//   { date: "2024-06-17", read: 475, comment: 520, review: 525 },
//   { date: "2024-06-18", read: 107, comment: 170, review: 175 },
//   { date: "2024-06-19", read: 341, comment: 290, review: 295 },
//   { date: "2024-06-20", read: 408, comment: 450, review: 455 },
//   { date: "2024-06-21", read: 169, comment: 210, review: 215 },
//   { date: "2024-06-22", read: 317, comment: 270, review: 275 },
//   { date: "2024-06-23", read: 480, comment: 530, review: 535 },
//   { date: "2024-06-24", read: 132, comment: 180, review: 185 },
//   { date: "2024-06-25", read: 141, comment: 190, review: 195 },
//   { date: "2024-06-26", read: 434, comment: 380, review: 385 },
//   { date: "2024-06-27", read: 448, comment: 490, review: 495 },
//   { date: "2024-06-28", read: 149, comment: 200, review: 205 },
//   { date: "2024-06-29", read: 103, comment: 160, review: 165 },
//   { date: "2024-06-30", read: 446, comment: 400, review: 405 },
// ];

const chartConfig = {
  views: {
    label: "Lượt",
  },
  read: {
    label: "Đọc",
    color: "hsl(var(--chart-1))",
  },
  comment: {
    label: "Bình luận",
    color: "hsl(var(--chart-2))",
  },
  review: {
    label: "Đánh giá",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface Props {
  data: {
    date: number;
    read: number;
    comment: number;
    review: number;
  }[];
}

export function Chart({ data }: Props) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("read");

  const total = React.useMemo(
    () => ({
      read: data.reduce((acc, curr) => acc + curr.read, 0),
      comment: data.reduce((acc, curr) => acc + curr.comment, 0),
      review: data.reduce((acc, curr) => acc + curr.review, 0),
    }),
    [data],
  );

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
        <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Biểu Đồ Thanh - Tương Tác</CardTitle>
          <CardDescription>
            Hiển thị tổng số lượt xem trong 28 ngày qua
          </CardDescription>
        </div>
        <div className="flex">
          {["read", "comment", "review"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("vi-VN", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
