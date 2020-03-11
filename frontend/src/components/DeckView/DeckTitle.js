import React from 'react'
import { Typography } from '@material-ui/core'
import { count } from '../Common/utils'

export default function DeckTitle({ deck }) {
  return (
    <>
      <Typography variant='h6'>{`${deck.name} (${count(deck.mainboard)})`}</Typography>
      <Typography variant='subtitle'>
        {`Created at ${deck.created_at}`} <span>&#8281;</span> {`by ${deck.user}`}
      </Typography>
    </>
  )
}
