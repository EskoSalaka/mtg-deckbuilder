import React from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"
import { typeStats } from "../utils"

const COLORS = ["#3b8200", "#949400", "#e6d817", "#5360ed", "#d64747", "#c2bcab"]

export default function ColorsPie({ cards }) {
  const data = typeStats(cards)

  return (
    <PieChart width={400} height={250}>
      <Pie
        data={data}
        labelLine={false}
        outerRadius={90}
        margin={{ top: 10, right: 1, bottom: 0, left: 10 }}
        labelLine
        label
      >
        {data.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="middle" align="right" layout="vertical" />
    </PieChart>
  )
}
