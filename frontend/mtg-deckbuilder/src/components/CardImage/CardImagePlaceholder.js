import React, { useState } from "react"
import { makeStyles } from "@material-ui/styles"

const styles = makeStyles({
  cardImagePlaceholder: {
    borderRadius: "4.75% / 3.5%",
    width: "100%",
    height: "100%"
  }
})

export default function CardImagePlaceholder({ width }) {
  const classes = styles()

  return (
    <img
      src={process.env.PUBLIC_URL + "/card_back.jpg"}
      alt="Card back"
      className={classes.cardImagePlaceholder}
    />
  )
}
