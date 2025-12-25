import { api } from "@/api";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface ChartProps {
  data: any;
}

export default function Chart({ data }:ChartProps) {

  return (
    <PieChart width={500} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
        <Cell fill="#82ca9d"></Cell>
        <Cell fill="#FF6347"></Cell>
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
