"use client"

import { BarChart } from "@/components/barchart"

interface BarChartProps {
    plantendata4: { name: string; value: number }[];
  }

const valueFormatter = (value: number) => {
    return Intl.NumberFormat("us").format(value).toString();
};

export const ChartBloei = ({ plantendata4 }: BarChartProps) => {
  return (
    <BarChart
      className="h-96"
      data={plantendata4}
      index="name"
      categories={["value"]}
      valueFormatter={valueFormatter}
      yAxisWidth={144}
      layout="horizontal"
    />
  )
}