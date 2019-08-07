import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import styles from "./styles"
import DeckBuildeCardTable from "./DeckBuilderCardTable"
import { sorted, byCount, includes, enhanched, incremented, decremented } from "../Common/utils"

export default function DeckBuilderView({ cards }) {
  const classes = styles()

  const [deck, setDeck] = useState([])
  const [sideboard, setSideboard] = useState(cards)

  function sbToDeck(card) {
    setDeck(incremented(deck, card))
    setSideboard(decremented(sideboard, card))
  }

  function deckToSb(card) {
    setDeck(decremented(deck, card))
    setSideboard(incremented(sideboard, card))
  }

  return (
    <Grid spacing={5} container justify="center">
      <Grid item>
        <DeckBuildeCardTable cards={sideboard} handleTransfer={sbToDeck} />
      </Grid>
      <Grid item>
        <DeckBuildeCardTable cards={deck} handleTransfer={deckToSb} />
      </Grid>
    </Grid>
  )
}
