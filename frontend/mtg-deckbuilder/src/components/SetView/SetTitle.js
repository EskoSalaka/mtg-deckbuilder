import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import SetIcon from "../Common/SetIcon"
import { Container, Typography, Box } from "@material-ui/core"
import styles from "./styles"

export default function SetTitle({ set }) {
  const classes = styles()

  return (
    <Box display="flex" pl={3}>
      <SetIcon width={"30px"} height={""} colorStyle={"common"} setCode={set.code} />
      <Box pl={2}>
        <Typography variant="h6" className={classes.titleText}>
          {set.name} {`(${set.code.toUpperCase()})`}
        </Typography>
        <Typography variant="subtitle" className={classes.subtitleText}>
          {`${set.card_count} cards`} <span>&#8281;</span> {`Released ${set.released_at}`}
        </Typography>
      </Box>
    </Box>
  )
}
