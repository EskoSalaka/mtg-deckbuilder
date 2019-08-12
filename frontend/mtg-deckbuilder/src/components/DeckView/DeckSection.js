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
  Link
} from "@material-ui/core"
import styles from "./styles"
import { count } from "../Common/utils"

export default function DeckSection({ cards, sectionName, handleOnMouseMove }) {
  const classes = styles()
  const cardCount = cards ? count(cards) : 0

  return (
    <Grid container direction="column">
      <Typography
        variant="h6"
        className={classes.sectionTitle}
      >{`${sectionName} (${cardCount})`}</Typography>
      {cards
        ? cards.map(c => (
            <Link href={"kaka"} color="inherit" onMouseMove={handleOnMouseMove}>
              <Typography variant="body2">{`${c.count} ${c.name}`}</Typography>
            </Link>
          ))
        : null}
    </Grid>
  )
}
