import React, { useState, useEffect } from "react"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
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

import styles from "./styles"
import DeckBuildeCardTable from "./DeckBuilderCardTable"
import { incrementedMany, decrementedMany, count } from "../Common/utils"
import FullStatsBox from "../Common/StatsPlots/FullStatsBox"
import CardImage from "../CardImage"

export default function DeckBuilderView({ cards }) {
  const classes = styles()

  const [deck, setDeck] = useState([])
  const [sideboard, setSideboard] = useState(cards)
  const [showStats, setShowStats] = useState(false)
  const [cardToShow, setCardToShow] = useState(cards[0])
  const [sbTransferTrigger, setSbTransferTrigger] = useState(0)
  const [dTransferTrigger, setDTransferTrigger] = useState(0)

  function toggleStatsDrawer(s) {
    setShowStats(s)
  }

  function sbToDeck(cards) {
    setDeck(incrementedMany(deck, cards))
    setSideboard(decrementedMany(sideboard, cards))
  }

  function deckToSb(cards) {
    setDeck(decrementedMany(deck, cards))
    setSideboard(incrementedMany(sideboard, cards))
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
      <Box display="flex" justifyContent="center" p="10px">
        <Paper className={classes.topPaper}>
          <Grid
            className={classes.contentsGrid}
            direction="row"
            spacing={2}
            container
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="h6">{`Sideboard (${count(sideboard)})`}</Typography>
              <DeckBuildeCardTable
                cards={sideboard}
                handleTransfer={sbToDeck}
                setImage={setCardToShow}
                transferTrigger={sbTransferTrigger}
              />
            </Grid>
            <Grid item>
              <Box justifyContent="center" display="grid" mt="100px">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={e => setSbTransferTrigger(sbTransferTrigger + 1)}
                >
                  <ArrowForwardIosIcon />
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={e => setDTransferTrigger(dTransferTrigger + 1)}
                >
                  <ArrowBackIosIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="h6">{`Deck (${count(deck)})`}</Typography>
              <DeckBuildeCardTable
                cards={deck}
                handleTransfer={deckToSb}
                setImage={setCardToShow}
                transferTrigger={dTransferTrigger}
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
      </Box>
    </div>
  )
}
