import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, Typography } from "@material-ui/core"
import SetIcon from "../SetIcon"

const styles = makeStyles({
  typeLineText: { fontSize: 16 },
  containerBox: {
    display: "flex",
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: "space-between"
  }
})

export default function CardTypeLine({ cardTypeLine, card }) {
  const classes = styles()

  return (
    <Box className={classes.containerBox}>
      <Typography className={classes.typeLineText}>{card.type_line}</Typography>
      <Box component="a" href={`../${card.set}`}>
        <SetIcon width={""} height={"22"} colorStyle={"rare"} setCode={card.set} />
      </Box>
    </Box>
  )
}
