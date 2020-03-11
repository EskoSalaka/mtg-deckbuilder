import React from 'react'
import { PieChart, Pie, Cell, Legend } from 'recharts'
import { simpleTypeStats } from '../utils'
import { Typography } from '@material-ui/core'

const COLORS = ['#3b8200', '#949400', '#fa9039']

export default function SimpleTypesPie({ cards }) {
  const simpleData = simpleTypeStats(cards)

  return (
    <div>
      <Typography align='center' variant='h6'>
        Types
      </Typography>
      <PieChart width={350} height={250} title='Chart of PU x UV'>
        <Pie
          data={simpleData}
          labelLine={false}
          outerRadius={90}
          margin={{ top: 10, right: 10, bottom: 0, left: 10 }}
          labelLine
          label
        >
          {simpleData.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign='middle' align='right' layout='vertical' />
      </PieChart>
    </div>
  )
}
