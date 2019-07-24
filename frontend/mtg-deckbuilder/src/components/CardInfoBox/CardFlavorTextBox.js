import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"

const styles = makeStyles({
  firstLine: { fontStyle: "italic", fontSize: 15, fontFamily: "georgia" },
  bottomLines: {
    fontStyle: "italic",
    fontSize: 15,
    fontFamily: "georgia",
    paddingTop: 8
  },
  containerBox: {
    paddingTop: 8,
    paddingBottom: 8
  }
})

export default function CardTextBox({ cardFlavorText }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      {cardFlavorText
        ? cardFlavorText.split("\n").map((line, key) => {
            return (
              <Typography key={key} className={key === 0 ? classes.firstLine : classes.bottomLines}>
                {line}
              </Typography>
            )
          })
        : null}
    </Box>
  )
}
