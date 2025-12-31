"use client"

import { DonutChart } from "@/components/donutchart"

interface DonutChartProps2 {
    plantendata3: { name: string; value: number; }[];
  }

const chartColors = [
  "bg-blue-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
];

export const ChartBedreigd = ({ plantendata3 }: DonutChartProps2) => (
  <div className="flex flex-col items-center gap-4">
    <DonutChart
      className="mx-auto"
      data={plantendata3}
      category="name"
      value="value"
      showLabel={false}
    />
    {/* Legend */}
    <div className="flex flex-col gap-2 text-sm w-full max-w-xs">
      {plantendata3.map((item, index) => (
        <div key={item.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${chartColors[index % chartColors.length]}`} />
            <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
          </div>
          <span className="font-medium text-gray-900 dark:text-gray-50">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
)