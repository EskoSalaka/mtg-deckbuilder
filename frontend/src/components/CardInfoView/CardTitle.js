import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"
import ManaCost from "../ManaCost"

const styles = makeStyles({
  titleText: { fontSize: 18, paddingRight: 12 },
  manaCostText: { fontSize: 16 },

  containerBox: {
    display: "flex",
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: "space-between"
  }
})

export default function CardTitle({ cardName, cardManaCost }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      <Typography className={classes.titleText}>{cardName} </Typography>
      <Typography className={classes.manaCostText}>
        <ManaCost manaCost={cardManaCost} />
      </Typography>
    </Box>
  )
}
