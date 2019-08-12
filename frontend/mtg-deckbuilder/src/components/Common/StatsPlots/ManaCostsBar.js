import React from "react"
import { BarChart, XAxis, YAxis, Bar, Scatter } from "recharts"
import { manaCosts, avgManaCost } from "../utils"

export default function ManaCostsBar({ cards }) {
  const manaCostsData = manaCosts(cards)
  const avg = avgManaCost(cards)

  return (
    <BarChart
      width={300}
      height={200}
      data={manaCostsData}
      margin={{ top: 15, right: 10, bottom: 0, left: 0 }}
    >
      <XAxis dataKey="name" />
      <YAxis />

      <Bar nameKey="name" dataKey="value" fill="#8884d8" />
      <Scatter data={[{ x: 2, y: 2, z: 2 }]} shape="cross" />
    </BarChart>
  )
}
