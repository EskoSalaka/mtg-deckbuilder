import React from "react"
import { Grid } from "@material-ui/core"
import LegalityIndicator from "./LegalityIndicator"
import { makeStyles } from "@material-ui/styles"

const styles = makeStyles({
  container: {
    paddingTop: 8
  },
  gridItem: {
    padding: 2
  }
})

export default function CardLegalityGrid({ cardLegalities }) {
  const classes = styles()
  const formats = [
    "standard",
    "commander",
    "frontier",
    "modern",
    "pauper",
    "duel",
    "legacy",
    "penny",
    "oldschool",
    "vintage",
    "future"
  ]

  return (
    <Grid container className={classes.container} direction="row" justify="left" alignItems="left">
      {formats.map(function(key) {
        return (
          <Grid item xs={4} className={classes.gridItem}>
            <LegalityIndicator format={key} legality={cardLegalities[key]} />
          </Grid>
        )
      })}
    </Grid>
  )
}
