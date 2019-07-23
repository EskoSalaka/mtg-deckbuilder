import React from "react"
import { Grid } from "@material-ui/core"
import LegalityIndicator from "./LegalityIndicator"
import { makeStyles } from "@material-ui/styles"

const styles = makeStyles({
  container: {
    padding: 10
  }
})

export default function FunctionName({ card }) {
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
    <Grid
      container
      className={classes.container}
      spacing={1}
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      {formats.map(function(key) {
        return (
          <Grid item xs={4}>
            <LegalityIndicator format={key} legality={card.legalities[key]} />
          </Grid>
        )
      })}
    </Grid>
  )
}
