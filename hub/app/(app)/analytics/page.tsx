"use client";

import { Chart } from "./chart";

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border shadow rounded-xl bg-card text-card-foreground space-y-1.5 p-6 flex flex-col items-center">
        <h2 className="font-semibold leading-none tracking-tight">
          Số lượt xem
        </h2>
        <span className="flex items-center text-3xl">0</span>
      </div>
      <div className="border shadow rounded-xl bg-card text-card-foreground space-y-1.5 p-6 flex flex-col items-center">
        <h2 className="font-semibold leading-none tracking-tight">
          Số lượt bình luận
        </h2>
        <span className="flex items-center text-3xl">0</span>
      </div>
      <div className="border shadow rounded-xl bg-card text-card-foreground space-y-1.5 p-6 flex flex-col items-center">
        <h2 className="font-semibold leading-none tracking-tight">
          Số lượt đánh giá
        </h2>
        <span className="flex items-center text-3xl">0</span>
      </div>
      <Chart />
    </div>
  );
}
