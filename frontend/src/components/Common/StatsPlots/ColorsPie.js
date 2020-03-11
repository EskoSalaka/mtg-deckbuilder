import React from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts'

import { colorStats, manaSymbols } from '../utils'
import { Typography } from '@material-ui/core'

const COLORS = ['#e3dd96', '#0e67ab', '#525252', '#d32029', '#00733d', '#c2bcab']
const RADIAN = Math.PI / 180

export default function ColorsPie({ cards }) {
  const colorData = colorStats(cards)

  const manaSymbolsData = manaSymbols(cards)
  const sum = colorData.map((d) => d.value).reduce((a, b) => a + b, 0)

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {percent !== 0 ? percent * sum : ''}
      </text>
    )
  }

  return (
    <div>
      <Typography align='center' variant='h6'>
        Manasymbols & Colors
      </Typography>
      <PieChart width={250} height={250}>
        <Pie
          data={colorData}
          dataKey='value'
          nameKey='name'
          labelLine={false}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          label={renderCustomizedLabel}
          outerRadius={60}
          fill='#8884d8'
        >
          {colorData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie data={manaSymbolsData} innerRadius={70} outerRadius={90} fill='#82ca9d' label>
          {manaSymbolsData.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}
