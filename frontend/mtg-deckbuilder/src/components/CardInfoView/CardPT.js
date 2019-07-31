import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"

const styles = makeStyles({
  containerBox: {
    paddingTop: 8,
    paddingBottom: 8
  }
})

export default function CardPT({ cardPower, cardToughness }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      <Typography>
        {cardPower}/{cardToughness}
      </Typography>
    </Box>
  )
}
