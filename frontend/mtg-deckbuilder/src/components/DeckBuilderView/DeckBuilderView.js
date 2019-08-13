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
  Box,
  Paper
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import styles from "./styles"
import DeckBuildeCardTable from "./DeckBuilderCardTable"
import { incremented, decremented } from "../Common/utils"
import FullStatsBox from "../Common/StatsPlots/FullStatsBox"
import CardImage from "../CardImage"

export default function DeckBuilderView({ cards }) {
  const classes = styles()

  const [deck, setDeck] = useState([])
  const [sideboard, setSideboard] = useState(cards)
  const [showStats, setShowStats] = useState(false)
  const [cardToShow, setCardToShow] = useState(cards[0])

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

  function handleMouseOverRow(e) {
    e.preventDefault()

    setCardToShow(cards.find(c => c.id === e.target.parentNode.id))
  }

  return (
    <Paper className={classes.topPaper}>
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

      <Grid
        className={classes.contentsGrid}
        direction="row"
        spacing={2}
        container
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <DeckBuildeCardTable
            cards={sideboard}
            handleTransfer={sbToDeck}
            handleMouseOverRow={handleMouseOverRow}
          />
        </Grid>
        <Grid item>
          <DeckBuildeCardTable
            cards={deck}
            handleTransfer={deckToSb}
            handleMouseOverRow={handleMouseOverRow}
          />
        </Grid>
        <Grid container item xs>
          {cardToShow ? (
            <Box className={classes.cardImageBox} ml="auto">
              <CardImage card={cardToShow} />
            </Box>
          ) : null}
        </Grid>
      </Grid>
      <Drawer anchor="top" open={showStats} onClose={e => toggleStatsDrawer(false)}>
        <FullStatsBox cards={deck} direction={"row"} />
      </Drawer>
    </Paper>
  )
}
