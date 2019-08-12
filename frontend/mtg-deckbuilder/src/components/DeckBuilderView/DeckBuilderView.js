import React, { useState, useEffect } from "react"
import {
  Grid,
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import styles from "./styles"
import DeckBuildeCardTable from "./DeckBuilderCardTable"
import { incremented, decremented } from "../Common/utils"
import FullStatsBox from "../Common/StatsPlots/FullStatsBox"

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
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Show deck statistics</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FullStatsBox cards={deck} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid spacing={5} container justify="center">
        <Grid item>
          <DeckBuildeCardTable cards={sideboard} handleTransfer={sbToDeck} />
        </Grid>
        <Grid item>
          <DeckBuildeCardTable cards={deck} handleTransfer={deckToSb} />
        </Grid>
      </Grid>
    </Grid>
  )
}
