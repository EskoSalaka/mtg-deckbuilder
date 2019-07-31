import React from "react"
import { Grid, Link } from "@material-ui/core"
import CardImage from "../CardImage/"

export default function CardImageGridItem({ card }) {
  return (
    <Grid item key={card.api_key} lg={3} md={4} xs={6}>
      <Link href={`/cards/${card.set}/${card.collector_number}`}>
        <CardImage card={card} turned={false} />
      </Link>
    </Grid>
  )
}
