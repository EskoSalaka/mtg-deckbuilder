import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function CardPT({ cardPower, cardToughness }) {
  return (
    <Box display='flex' justifyContent='flex-end'>
      <Typography variant='h6'>
        {cardPower}/{cardToughness}
      </Typography>
    </Box>
  )
}
