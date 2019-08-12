import React, { useState, useEffect } from "react"
import {
  Grid,
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Drawer,
  Box
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
  const [showStats, setShowStats] = useState(false)

  function toggleStatsDrawer(s) {
    setShowStats(s)
  }

  function sbToDeck(card) {
    setDeck(incremented(deck, card))
    setSideboard(decremented(sideboard, card))
  }

  function deckToSb(card) {
    setDeck(decremented(deck, card))
    setSideboard(incremented(sideboard, card))
  }

  return (
    <div>
      <AppBar position="static" color="default" className={classes.deckbuilderAppbar}>
        <Toolbar className={classes.deckBuilderToolbar}>
          <Button color="green" edge="end" onClick={toggleStatsDrawer}>
            Show stats
          </Button>
          <Button color="green" edge="end">
            Done
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Grid spacing={5} container justify="center">
          <Grid item>
            <DeckBuildeCardTable cards={sideboard} handleTransfer={sbToDeck} />
          </Grid>
          <Grid item>
            <DeckBuildeCardTable cards={deck} handleTransfer={deckToSb} />
          </Grid>
        </Grid>
        <Drawer anchor="top" open={showStats} onClose={e => toggleStatsDrawer(false)}>
          <FullStatsBox cards={deck} />
        </Drawer>
      </Box>
    </div>
  )
}
