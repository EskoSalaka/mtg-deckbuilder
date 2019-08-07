import React, { useState } from "react"
import styles from "./styles"
import Type from "../../Common/Type"
import ManaCost from "../../ManaCost"
import { frontFaceAttr } from "../../Common/utils"

import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { Typography } from "@material-ui/core"

export default function CRow({ card, isSelected, handleClick, handleDoubleClick }) {
  const classes = styles()

  return (
    <TableRow
      className={classes.row}
      key={card.api_key}
      hover
      selected={isSelected}
      onClick={e => handleClick(e, card)}
      onDoubleClick={e => handleDoubleClick(e, card)}
    >
      <TableCell key="num" className={classes.cell}>
        <Typography className={classes.cellText}>{card.count}</Typography>
      </TableCell>
      <TableCell key="name" className={classes.cell}>
        <Typography className={classes.cellText}>{card.name}</Typography>
      </TableCell>
      <TableCell key="type" className={classes.ptCell}>
        <Typography className={classes.ptCellText}>
          <Type typeLine={card.type_line} />
        </Typography>
      </TableCell>
      <TableCell key="cost" className={classes.cell}>
        <Typography className={classes.cellText}>
          <ManaCost manaCost={frontFaceAttr(card, "mana_cost")} />
        </Typography>
      </TableCell>
      <TableCell key="pt" className={classes.lastCell}>
        <Typography className={classes.ptCellText}>
          {frontFaceAttr(card, "power")
            ? frontFaceAttr(card, "power") + "/" + frontFaceAttr(card, "toughness")
            : null}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
