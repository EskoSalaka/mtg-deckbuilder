import React from "react"
import { BarChart, XAxis, YAxis, Bar, ReferenceLine } from "recharts"
import { manaCosts, avgManaCost } from "../utils"

export default function ManaCostsBar({ cards }) {
  const manaCostsData = manaCosts(cards)
  const avg = avgManaCost(cards)
  console.log(manaCostsData)

  return (
    <BarChart
      width={350}
      height={250}
      data={manaCostsData}
      margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
    >
      <XAxis dataKey="name" />
      <YAxis />

      <Bar nameKey="name" dataKey="value" fill="#8884d8" />
      <ReferenceLine
        y={avg}
        label={{ position: "left", value: Math.round(avg * 10) / 10, fill: "red" }}
        stroke="red"
        strokeDasharray="3 3"
      />
    </BarChart>
  )
}
