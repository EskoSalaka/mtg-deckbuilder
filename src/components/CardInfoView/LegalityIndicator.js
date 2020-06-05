import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function LegalityIndicator({ format, legality }) {
  return (
    <Box
      borderRadius={4}
      p='9px'
      justifyContent='center'
      bgcolor={
        legality === 'legal' ? '#5e8847d9' : legality === 'restricted' ? '#cfac00' : '#8a1d1dab'
      }
    >
      <Typography>
        <Box fontWeight={500} fontSize={15} textAlign='center' color='white'>
          {format.toUpperCase()}
        </Box>
      </Typography>
    </Box>
  )
}
