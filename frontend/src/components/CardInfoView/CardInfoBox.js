import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Paper, Divider } from "@material-ui/core"
import CardLegalityGrid from "./CardLegalityGrid"
import CardFaceInfo from "./CardFaceInfo"
import CardIllustrationLine from "./CardIllustrationLine"

const styles = makeStyles({
  topContainer: { padding: 10 }
})

export default function CardInfoBox({ card }) {
  const classes = styles()

  return (
    <Paper className={classes.topContainer} elevation="5">
      {card.card_faces ? (
        card.card_faces.map(face => <CardFaceInfo cardFace={face} card={card} />)
      ) : (
        <CardFaceInfo cardFace={card} card={card} />
      )}
      <CardIllustrationLine card={card} />
      <Divider />
      <CardLegalityGrid cardLegalities={card.legalities} />
    </Paper>
  )
}

export * from "./CardInfoBox"
