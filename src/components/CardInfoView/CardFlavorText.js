import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function CardFlavorText({ cardFlavorText }) {
  return (
    <Box fontStyle='italic' fontFamily='georgia' fontSize={15}>
      <Typography variant='p'>{cardFlavorText}</Typography>
    </Box>
  )
}
