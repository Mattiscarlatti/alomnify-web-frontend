"use client"

import { BarChart } from "@/components/barchart"

interface BarChartProps {
    plantendata5: { name: string; value: number }[];
  }

const valueFormatter = (value: number) => {
    return Intl.NumberFormat("us").format(value).toString();
};

export const ChartEetb = ({ plantendata5 }: BarChartProps) => {
  return (
    <BarChart
      className="h-96"
      data={plantendata5}
      index="name"
      categories={["value"]}
      valueFormatter={valueFormatter}
      yAxisWidth={144}
      layout="vertical"
    />
  )
}