import React from 'react'

import { Box, Typography } from '@material-ui/core'
import BrushIcon from '@material-ui/icons/Brush'

export default function CardIllustrationLine({ card }) {
  return (
    <Box display='flex' alignContent='center' textAlign='center'>
      <Box display='flex' alignContent='center' flexGrow={1}>
        <BrushIcon fontSize='small' />
        <Typography>{` ${card.artist}`}</Typography>
      </Box>
      <Typography variant='subtitle1'>{`#${card.collector_number}`}</Typography>
    </Box>
  )
}
