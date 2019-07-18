import React, { useState } from "react"
import LazyLoad from "react-lazyload"
import { Grid, Link } from "@material-ui/core"
import CardImage from "./CardImage"

export default function CardImageGridItem({ card }) {
  return (
    <Grid item key={card.api_key} lg={3} md={4} xs={6}>
      <LazyLoad height={400}>
        <Link href={`/cards/${card.id}`}>
          <CardImage card={card} turned={false} />
        </Link>
      </LazyLoad>
    </Grid>
  )
}
