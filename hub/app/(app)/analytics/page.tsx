"use client";

import { useAnalyticsQuery } from "@/apollo-client/__generated";
import { useState } from "react";
import { Chart } from "./chart";

export default function Page() {
  const [days, setDays] = useState(28);
  const { data, loading } = useAnalyticsQuery({
    variables: { days: days },
  });

  return (
    <>
      <Chart
        data={data?.myBookStatistics}
        loading={loading}
        days={days}
        daysOptions={[7, 28, 90, 365]}
        onSelectDays={(days) => {
          setDays(days);
        }}
      />
    </>
  );
}
