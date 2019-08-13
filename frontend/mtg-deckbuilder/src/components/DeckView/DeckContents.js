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
  Paper,
  Divider
} from "@material-ui/core"
import styles from "./styles"
import { group } from "../Common/utils"
import DeckSection from "./DeckSection"
import SideboardSection from "./SideboardSection"
import CardImage from "../CardImage"
import DeckTitle from "./DeckTitle"

export default function DeckContents({ deck }) {
  const classes = styles()

  const [groupBy, setGroupBy] = useState("type")
  const [cardToShow, setCardToShow] = useState(deck.cards[0])

  const groups = group(deck.cards, groupBy)
  const groupNames = Object.keys(groups).sort((g1, g2) => groups[g1].length <= groups[g2].length)

  function handleMouseOver(e, card) {
    e.preventDefault()
    setCardToShow(card)
  }

  return (
    <Paper className={classes.deckListPaper}>
      <DeckTitle deck={deck} />
      <Divider className={classes.divider} />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={8}>
          <Grid container direction="row" spacing={2}>
            {groupNames.map(groupName => {
              return groups[groupName].length ? (
                <Grid item xs={4} ms={4} lg={4}>
                  <DeckSection
                    cards={groups[groupName]}
                    sectionName={groupName}
                    handleMouseOver={handleMouseOver}
                  />
                </Grid>
              ) : null
            })}
          </Grid>
        </Grid>
        <Grid item xs>
          {cardToShow ? (
            <Box className={classes.cardImageBox}>
              <CardImage card={cardToShow} />
            </Box>
          ) : null}
        </Grid>
      </Grid>
      <Divider className={classes.divider} />

      <SideboardSection
        cards={deck.sideboard}
        sectionName={"Sideaboard"}
        handleMouseOver={handleMouseOver}
      />
    </Paper>
  )
}
