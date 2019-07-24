import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"

const styles = makeStyles({
  typeLineText: { fontSize: 16 },
  containerBox: {
    display: "flex",
    paddingBottom: 8,
    paddingTop: 8
  }
})

export default function CardTypeBox({ cardTypeLine }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      <Typography className={classes.typeLineText}>{cardTypeLine}</Typography>
    </Box>
  )
}
