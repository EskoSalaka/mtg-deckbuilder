import React from "react"
import { Grid, Typography, Link } from "@material-ui/core"
import styles from "./styles"
import { count } from "../Common/utils"

export default function DeckSection({ cards, sectionName, handleMouseOver }) {
  const classes = styles()
  const cardCount = cards ? count(cards) : 0

  return (
    <Grid container direction="column" alignItems="flex-start">
      <Typography
        variant="h6"
        className={classes.sectionTitle}
      >{`${sectionName} (${cardCount})`}</Typography>
      {cards
        ? cards.map(c => (
            <Grid item>
              <Typography variant="body2" onMouseOver={e => handleMouseOver(e, c)}>
                <Link href={"kaka"} color="inherit">{`${c.count} ${c.name}`}</Link>
              </Typography>
            </Grid>
          ))
        : null}
    </Grid>
  )
}
