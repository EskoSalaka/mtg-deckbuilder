import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"

const styles = makeStyles({
  cardText: { fontSize: 16 },
  flavorText: { fontStyle: "italic", fontSize: 15, fontFamily: "georgia" },
  bottomBox: {
    paddingTop: 13
  }
})

export default function FunctionName({ card }) {
  const classes = styles()

  return (
    <Box>
      <Box>
        {card.oracle_text
          ? card.oracle_text.split("\n").map((i, key) => {
              return (
                <Typography key={key} className={classes.cardText}>
                  {i}
                </Typography>
              )
            })
          : null}
      </Box>
      <Box className={classes.bottomBox}>
        {card.flavor_text
          ? card.flavor_text.split("\n").map((i, key) => {
              return (
                <Typography key={key} className={classes.flavorText}>
                  {i}
                </Typography>
              )
            })
          : null}
      </Box>
    </Box>
  )
}
