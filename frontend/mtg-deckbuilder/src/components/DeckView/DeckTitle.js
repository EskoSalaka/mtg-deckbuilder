import React from "react"
import { Typography } from "@material-ui/core"
import styles from "./styles"
import { count } from "../Common/utils"

export default function DeckTitle({ deck }) {
  const classes = styles()

  return (
    <>
      <Typography variant="h6">{`${deck.title} (${count(deck.cards)})`}</Typography>
      <Typography variant="subtitle">
        {`Created at ${deck.created_at}`} <span>&#8281;</span> {`by ${deck.user}`}
      </Typography>
    </>
  )
}
