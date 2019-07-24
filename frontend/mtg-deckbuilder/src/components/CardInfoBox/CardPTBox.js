import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"

const styles = makeStyles({
  typeLineText: { fontSize: 16, fontStyle: "bold" },
  containerBox: {
    paddingTop: 8,
    paddingBottom: 8
  }
})

export default function CardPTBox({ cardPower, cardToughness }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      <Typography className={classes.typeLineText}>
        {cardPower}/{cardToughness}
      </Typography>
    </Box>
  )
}
