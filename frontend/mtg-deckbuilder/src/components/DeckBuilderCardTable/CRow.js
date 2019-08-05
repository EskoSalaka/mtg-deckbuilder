import React, { useState } from "react"
import styles from "./styles"
import Type from "../Common/Type"
import ManaCost from "../ManaCost"

import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { Typography } from "@material-ui/core"

export default function CRow({ card, num }) {
  const classes = styles()
  //const { order, orderBy, onRequestSort } = props

  const manaCost =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].mana_cost
      : card.mana_cost

  const pt =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].power && card.card_faces[0].power + "/" + card.card_faces[0].toughness
      : card.power && card.power + "/" + card.toughness

  return (
    <TableRow className={classes.row} key={card.api_key} hover selected>
      <TableCell key="num" className={classes.cell}>
        <Typography className={classes.cellText}>{num}</Typography>
      </TableCell>
      <TableCell key="name" className={classes.cell}>
        <Typography className={classes.cellText}>{card.name}</Typography>
      </TableCell>
      <TableCell key="type" className={classes.ptCell}>
        <Typography className={classes.ptCellText}>
          <Type typeLine={card.type_line} />
        </Typography>
      </TableCell>
      <TableCell key="manacost" className={classes.cell}>
        <Typography className={classes.cellText}>
          <ManaCost manaCost={manaCost} />
        </Typography>
      </TableCell>
      <TableCell key="pt" className={classes.lastCell}>
        <Typography className={classes.ptCellText}>{pt}</Typography>
      </TableCell>
    </TableRow>
  )
}
