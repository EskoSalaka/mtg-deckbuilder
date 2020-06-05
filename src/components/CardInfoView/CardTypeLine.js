import React from 'react'

import { Box, Typography } from '@material-ui/core'
import SetIcon from '../Common/SetIcon'

export default function CardTypeLine({ cardTypeLine, card }) {
  return (
    <Box display='flex' justifyContent='space-between'>
      <Typography>{cardTypeLine}</Typography>
      <a href={`../${card.set}`}>
        <SetIcon width={''} height={'22'} colorStyle={card.rarity} setCode={card.set} />
      </a>
    </Box>
  )
}
