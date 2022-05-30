import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts'
import Title from './Title'

// Generate Weight Data
function createData(time: string, weight?: number) {
  return { time, weight }
}

const data = [
  { date: '2020-01-01', weight: 100 },
  { date: '2020-01-02', weight: 200 },
  { date: '2020-01-05', weight: 300 },
]

export default function Chart() {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Title>Weight Transition</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Weight (kg)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="weight"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
