"use client"

import { DonutChart } from "@/components/donutchart"

interface DonutChartProps2 {
    plantendata3: { name: string; value: number; }[];
  }

export const ChartBedreigd = ({ plantendata3 }: DonutChartProps2) => (
  <DonutChart
    className="mx-auto"
    data={plantendata3}
    category="name"
    value="value"
    showLabel={true}
  />
)