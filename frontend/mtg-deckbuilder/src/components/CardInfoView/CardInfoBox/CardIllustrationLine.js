import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"

const styles = makeStyles({
  containerBox: {
    paddingTop: 8,
    paddingBottom: 8,
    alignContent: "space-between"
  }
})

export default function CardIllustrationLine({ card }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      <Typography>{`illustr. by ${card.artist}`}</Typography>
      <Typography variant="subtitle">{`#${card.collector_number}`}</Typography>
    </Box>
  )
}
