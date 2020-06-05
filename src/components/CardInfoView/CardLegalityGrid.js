import React from 'react'
import { Grid } from '@material-ui/core'
import LegalityIndicator from './LegalityIndicator'

export default function CardLegalityGrid({ cardLegalities }) {
  const formats = [
    'standard',
    'commander',
    'frontier',
    'modern',
    'pauper',
    'duel',
    'legacy',
    'penny',
    'oldschool',
    'vintage',
    'future',
  ]

  return (
    <Grid container direction='row' justify='left' alignItems='left' spacing={1}>
      {formats.map(function (key) {
        return (
          <Grid item xs={4}>
            <LegalityIndicator format={key} legality={cardLegalities[key]} />
          </Grid>
        )
      })}
    </Grid>
  )
}
