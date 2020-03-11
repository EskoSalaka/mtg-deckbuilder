import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"

const styles = makeStyles({
  firstLine: { fontSize: 16 },
  bottomLines: {
    fontSize: 16,
    paddingTop: 8
  },
  containerBox: {
    paddingTop: 8,
    paddingBottom: 8
  }
})

export default function CardOracleText({ cardOracleText }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      {cardOracleText
        ? cardOracleText.split("\n").map((line, key) => {
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
