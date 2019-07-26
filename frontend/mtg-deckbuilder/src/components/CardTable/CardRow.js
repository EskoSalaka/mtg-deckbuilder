import React, { useState } from "react"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import ManaCost from "../ManaCost"
import { makeStyles } from "@material-ui/styles"

const styles = makeStyles({
  manaBody: {
    fontSize: 18,
    userSelect: "none",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  body: {
    fontSize: 12,
    userSelect: "none"
  },

  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#a8a5a8"
    }
  }
})

export default function CardRow({ card }) {
  const classes = styles()
  const frontFace =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].image_uris.normal
      : card.image_uris.normal

  return (
    <TableRow className={classes.row} data-card={frontFace} hover>
      <TableCell className={classes.body}>{card.name}</TableCell>
      <TableCell className={classes.body}>{card.type_line}</TableCell>
      <TableCell className={classes.body}>
        {card.power}
        {"/"}
        {card.toughness}
      </TableCell>
      <TableCell className={classes.manaBody}>
        <ManaCost manaCost={card.mana_cost} />
      </TableCell>
    </TableRow>
  )
}
