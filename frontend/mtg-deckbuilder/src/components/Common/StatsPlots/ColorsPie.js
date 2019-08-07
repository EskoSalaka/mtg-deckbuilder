import React from "react"
import { PieChart, Pie, Sector, Cell } from "recharts"

const data = [
  { name: "Group A", value: 10 },
  { name: "Group B", value: 5 },
  { name: "Group C", value: 5 },
  { name: "Group D", value: 5 },
  { name: "Group E", value: 2 }
]

const data2 = [
  { name: "Group A", value: 0 },
  { name: "Group B", value: 3 },
  { name: "Group C", value: 3 },
  { name: "Group D", value: 5 },
  { name: "Group D", value: 1 }
]
const COLORS = ["#edd9a1", "#0e67ab", "#757271", "#d32029", "#00733d"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {percent !== 0 ? percent * 27 : ""}
    </text>
  )
}

export default function ColorsPie({ cards }) {
  return (
    <PieChart width={400} height={200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx={"50%"}
        cy={"50%"}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={60}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Pie
        data={data2}
        cx={"50%"}
        cy={"50%"}
        innerRadius={70}
        outerRadius={90}
        fill="#82ca9d"
        label
      >
        {data.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}
