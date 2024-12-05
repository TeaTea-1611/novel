"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useBookStatisticsLazyQuery } from "@/apollo-client/__generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import NumberTicker from "./ui/number-ticker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  flower: {
    label: "Tặng hoa",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function BookAnalyticsDialog({
  bookId,
  children,
}: {
  bookId: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(28);
  const [query, { data, loading }] = useBookStatisticsLazyQuery({
    variables: {
      bookId,
      days,
    },
  });

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("read");

  const chartData = React.useMemo(() => {
    if (data) {
      const groupedData = data.bookStatistics.reduce((map, stat) => {
        const { date, read, comment, review, flower } = stat;

        const formattedDate = formatDate(new Date(date), "yyyy-MM-dd");

        if (!map.has(formattedDate)) {
          map.set(formattedDate, {
            date: formattedDate,
            read: 0,
            comment: 0,
            review: 0,
            flower: 0,
          });
        }
        const entry = map.get(formattedDate)!;
        entry.read += read;
        entry.comment += comment;
        entry.review += review;
        entry.flower += flower;
        return map;
      }, new Map<string, { date: string; read: number; comment: number; review: number; flower: number }>());

      return Array.from(groupedData.values());
    } else {
      return [];
    }
  }, [data]);

  const total = React.useMemo(
    () => ({
      read: chartData.reduce((acc, curr) => acc + curr.read, 0),
      comment: chartData.reduce((acc, curr) => acc + curr.comment, 0),
      review: chartData.reduce((acc, curr) => acc + curr.review, 0),
      flower: chartData.reduce((acc, curr) => acc + curr.flower, 0),
    }),
    [chartData],
  );

  useEffect(() => {
    if (open) {
      query({
        variables: {
          bookId,
          days,
        },
      });
    }
  }, [open, days, bookId, query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-full size-full">
        <DialogHeader>
          <DialogTitle>Số liệu thống kê truyện</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["read", "comment", "review", "flower"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  className={cn(
                    "col-span-1 border w-full shadow rounded-xl bg-card text-card-foreground space-y-1.5 p-6 flex flex-col items-center hover:ring-1 ring-primary",
                    { "ring-1 ring-primary": activeChart === chart },
                  )}
                  onClick={() => setActiveChart(chart)}
                >
                  <h2 className="font-semibold leading-none tracking-tight">
                    {chartConfig[chart].label}
                  </h2>
                  <span className="flex items-center text-3xl">
                    {total[key as keyof typeof total] ? (
                      <NumberTicker
                        value={total[key as keyof typeof total]}
                        stiffness={500}
                      />
                    ) : (
                      total[key as keyof typeof total].toLocaleString()
                    )}
                  </span>
                </button>
              );
            })}
            <Card className="col-span-2 md:col-span-4">
              <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
                <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
                  <CardTitle>Biểu Đồ Thanh - Tương Tác</CardTitle>
                  <CardDescription>
                    Hiển thị tổng số liệu trong {days} ngày qua
                  </CardDescription>
                </div>
                <div className="flex gap-1 px-6 py-5 sm:py-6">
                  <Select
                    value={days.toString()}
                    onValueChange={(value) => {
                      setDays(parseInt(value));
                    }}
                  >
                    <SelectTrigger label="Số ngày" className="w-48">
                      <SelectValue placeholder="Select page size">
                        {days} ngày qua
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {[7, 28, 90, 365].map((option) => (
                        <SelectItem key={option} value={String(option)}>
                          {option} ngày qua
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                {loading ? (
                  <Skeleton className="aspect-auto h-[250px] w-full" />
                ) : (
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                  >
                    <AreaChart
                      accessibilityLayer
                      data={chartData}
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
                              return new Date(value).toLocaleDateString(
                                "vi-VN",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              );
                            }}
                          />
                        }
                      />
                      <Area
                        type="natural"
                        fillOpacity={0.4}
                        dataKey={activeChart}
                        fill={`var(--color-${activeChart})`}
                        stroke={`var(--color-${activeChart})`}
                      />
                    </AreaChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
