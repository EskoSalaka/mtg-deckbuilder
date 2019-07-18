import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import CardImageGridItem from "./CardImageGridItem"

const styles = makeStyles({
  cardImage: {
    width: "100%",
    height: "100%"
  },
  gridItem: {},

  gridContainer: {
    maxWidth: 1600
  }
})

export default function CardImageList(props) {
  const classes = styles()

  return (
    <Grid container className={classes.gridContainer} spacing={3} justify="center">
      {props.cards.map(c => (
        <CardImageGridItem card={c} />
      ))}
    </Grid>
  )
}
