import React from 'react'
import { Box, Typography } from '@material-ui/core'

export default function CardOracleText({ cardOracleText }) {
  return (
    <Box fontSize={16} pb={2}>
      <Typography>{cardOracleText}</Typography>
    </Box>
  )
}
