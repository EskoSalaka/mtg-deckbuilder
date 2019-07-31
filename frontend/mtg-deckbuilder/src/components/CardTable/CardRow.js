import React, { useState, useEffect } from "react"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import ManaCost from "../ManaCost"
import { makeStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"

const styles = makeStyles({
  cellText: {
    fontSize: 16,
    whiteSpace: "nowrap",
    userSelect: "none",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "300px",
    lineHeight: 1.7,
    pointerEvents: "none",
    texDecoration: "none"
  },
  commonCellText: {
    fontSize: 16,
    color: "black",
    userSelect: "none",
    lineHeight: 1.7,
    pointerEvents: "none"
  },
  uncommonCellText: {
    fontSize: 16,
    color: "#B5B3B3",
    userSelect: "none",
    lineHeight: 1.7,
    pointerEvents: "none"
  },
  rareCellText: {
    fontSize: 16,
    color: "#ECC700",
    userSelect: "none",
    lineHeight: 1.7,
    pointerEvents: "none"
  },
  mythicCellText: {
    fontSize: 16,
    userSelect: "none",
    color: "#ed3700",
    lineHeight: 1.7,
    pointerEvents: "none"
  },

  ptCellText: {
    fontSize: 16,
    whiteSpace: "nowrap",
    userSelect: "none",
    textOverflow: "ellipsis",
    fontStyle: "bold",
    lineHeight: 1.7,
    pointerEvents: "none"
  },
  cell: { padding: "3px 6px 3px 11px", textDecoration: "none", borderBottom: "2px solid #bfbfbf" },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e8e8e8;"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "transparent"
    }
  }
})

export default function CardRow({ card, handleMouseMove }) {
  const classes = styles()

  const frontFace =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].image_uris.normal
      : card.image_uris.normal

  const manaCost =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].mana_cost
      : card.mana_cost

  const pt =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].power && card.card_faces[0].power + "/" + card.card_faces[0].toughness
      : card.power && card.power + "/" + card.toughness

  const R = card.rarity.charAt(0).toUpperCase()

  return (
    <TableRow
      key={card.api_key}
      className={classes.row}
      data-card={frontFace}
      onMouseMove={handleMouseMove}
    >
      <TableCell
        key="set"
        component="a"
        className={classes.cell}
        href={`/cards/${card.set}/${card.collector_number}`}
      >
        <Typography className={classes.cellText}>{card.set.toUpperCase()}</Typography>
      </TableCell>
      <TableCell
        key="name"
        component="a"
        className={classes.cell}
        href={`/cards/${card.set}/${card.collector_number}`}
      >
        <Typography className={classes.cellText}>{card.name}</Typography>
      </TableCell>
      <TableCell
        key="type"
        component="a"
        className={classes.cell}
        href={`/cards/${card.set}/${card.collector_number}`}
      >
        <Typography className={classes.cellText}>
          {card.type_line.replace("Legendary", "Lgd.")}
        </Typography>
      </TableCell>
      <TableCell
        key="p/t"
        className={classes.cell}
        component="a"
        href={`/cards/${card.set}/${card.collector_number}`}
      >
        <Typography className={classes.ptCellText}>{pt}</Typography>
      </TableCell>
      <TableCell key="manacost" className={classes.cell}>
        <ManaCost manaCost={manaCost} />
      </TableCell>
      <TableCell key="R" className={classes.cell}>
        <Typography
          className={
            R === "M"
              ? classes.mythicCellText
              : R === "R"
              ? classes.rareCellText
              : R === "U"
              ? classes.uncommonCellText
              : classes.commonCellText
          }
        >
          {card.rarity.charAt(0).toUpperCase()}
        </Typography>
      </TableCell>
      <TableCell key="no" className={classes.cell}>
        <Typography className={classes.cellText}>{card.collector_number}</Typography>
      </TableCell>
    </TableRow>
  )
}
