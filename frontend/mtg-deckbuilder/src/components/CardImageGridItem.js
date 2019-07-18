import React from "react"
import { makeStyles } from "@material-ui/styles"
import LazyLoad from "react-lazyload"
import { Grid, Link } from "@material-ui/core"

const styles = makeStyles({
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: "4.75% / 3.5%"
  },
  gridItem: {}
})

export default function CardImageGridItem({ card }) {
  const classes = styles()

  return (
    <Grid item key={card.api_key} lg={3} md={4} xs={12}>
      <LazyLoad height={300}>
        <Link href={`/cards/${card.id}`}>
          <img className={classes.cardImage} src={card.image_uris.normal} alt="imag" />
        </Link>
      </LazyLoad>
    </Grid>
  )
}
