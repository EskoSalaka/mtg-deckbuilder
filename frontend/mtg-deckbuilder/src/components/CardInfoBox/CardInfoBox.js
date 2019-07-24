import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Paper } from "@material-ui/core"
import CardLegalityGrid from "./CardLegalityGrid"

import CardFaceInfo from "./CardFaceInfo"

const styles = makeStyles({
  topContainer: { padding: 10 }
})

export default function CardInfoBox({ card }) {
  const classes = styles()

  return (
    <Paper className={classes.topContainer}>
      {card.card_faces ? (
        card.card_faces.map(face => <CardFaceInfo cardFace={face} />)
      ) : (
        <CardFaceInfo cardFace={card} />
      )}
      <CardLegalityGrid cardLegalities={card.legalities} />
    </Paper>
  )
}

export * from "./CardInfoBox"
