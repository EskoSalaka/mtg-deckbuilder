import React from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"
import { simpleTypeStats } from "../utils"

const COLORS = ["#3b8200", "#949400", "#fa9039"]

export default function SimpleTypesPie({ cards }) {
  const simpleData = simpleTypeStats(cards)

  return (
    <PieChart width={350} height={250}>
      <Pie
        data={simpleData}
        labelLine={false}
        outerRadius={90}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        labelLine
        label
      >
        {simpleData.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="middle" align="right" layout="vertical" />
    </PieChart>
  )
}
