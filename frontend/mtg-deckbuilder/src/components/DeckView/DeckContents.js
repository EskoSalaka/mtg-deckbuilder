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
import styles from "./styles"
import { groupBy } from "../Common/utils"
import DeckSection from "./DeckSection"

export default function DeckContents({ deck }) {
  const classes = styles()
  const groups = groupBy(deck)
  const groupNames = Object.keys(groups).sort((g1, g2) => groups[g1].length <= groups[g2].length)
  console.log(groups)

  return (
    <Grid container direction="row" spacing={2}>
      {groupNames.map(groupName => {
        return groups[groupName].length ? (
          <Grid item xs={6}>
            <DeckSection cards={groups[groupName]} sectionName={groupName} />
          </Grid>
        ) : null
      })}
      <Grid item xs={6}>
        <DeckSection cards={deck.sideboard} sectionName={"Sideaboard"} />
      </Grid>
    </Grid>
  )
}
