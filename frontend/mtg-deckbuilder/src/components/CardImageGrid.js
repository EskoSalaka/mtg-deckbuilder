import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import CardImageGridItem from "./CardImageGridItem"

const styles = makeStyles({
  gridContainer: {
    maxWidth: 1000
  }
})

export default function CardImageList(props) {
  const classes = styles()

  return (
    <Grid container className={classes.gridContainer} spacing={1} justify="center">
      {props.cards.map(c => (
        <CardImageGridItem card={c} />
      ))}
    </Grid>
  )
}
