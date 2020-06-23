import React from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: 'conic-gradient(#E9E7DA, #3F9DED, black, #F85D50, #37C05C, #E9E7DA)',
  },
}))

export default function MtgDeckbuilderGradientIcon() {
  const classes = useStyles()

  return (
    <Avatar className={classes.avatar}>
      <img
        src={`${process.env.PUBLIC_URL}/cards_icon.svg`}
        alt='mtg-deckbuilder'
        width='32px'
        height='32px'
      ></img>
    </Avatar>
  )
}
