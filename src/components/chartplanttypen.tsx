"use client"

import { BarChart } from "@/components/barchart"

interface BarChartProps {
    plantendata1: { name: string; value: number }[];
  }

const valueFormatter = (value: number) => {
    return Intl.NumberFormat("us").format(value).toString();
};

export const ChartPlantTypen = ({ plantendata1 }: BarChartProps) => {
  return (
    <BarChart
      className="h-96"
      data={plantendata1}
      index="name"
      categories={["value"]}
      valueFormatter={valueFormatter}
      yAxisWidth={144}
      layout="vertical"
    />
  )
}