import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import CardInfoBox from "./CardInfoBox"
import CardImage from "../CardImage"

const styles = makeStyles({
  rootContainer: {
    flexGrow: 1,
    minWidth: "400"
  },
  imageBox: { maxWidth: "400px", minWidth: "350px", padding: "10px" },
  infoBox: { maxWidth: "400px", minWidth: "350px", paddingTop: "20px", padding: "10px" }
})

export default function FullCardInfo({ card }) {
  const classes = styles()

  return (
    <Grid className={classes.rootContainer} spacing={0} container justify="center">
      <Grid item className={classes.infoBox}>
        <CardInfoBox card={card} />
      </Grid>
      <Grid item className={classes.imageBox}>
        <CardImage card={card} />
      </Grid>
    </Grid>
  )
}
