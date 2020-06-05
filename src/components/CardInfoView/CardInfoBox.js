import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Divider } from '@material-ui/core'
import CardLegalityGrid from './CardLegalityGrid'
import CardFaceInfo from './CardFaceInfo'
import CardIllustrationLine from './CardIllustrationLine'

const styles = makeStyles({
  paper: { padding: 10 },
  divider: { marginTop: 5, marginBottom: 5 },
})

export default function CardInfoBox({ card }) {
  const classes = styles()

  return (
    <Paper className={classes.paper} elevation='5'>
      {card.card_faces ? (
        card.card_faces.map((face) => <CardFaceInfo cardFace={face} card={card} />)
      ) : (
        <CardFaceInfo cardFace={card} card={card} />
      )}
      <CardIllustrationLine card={card} />
      <Divider className={classes.divider} />
      <CardLegalityGrid cardLegalities={card.legalities} />
    </Paper>
  )
}

export * from './CardInfoBox'
