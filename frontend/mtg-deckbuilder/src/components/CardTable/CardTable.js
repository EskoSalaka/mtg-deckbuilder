import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CardRow from "./CardRow"
import CardImagePopover from "./CardImagePopover"
import HeaderRow from "./HeaderRow"

const styles = makeStyles({
  root: { maxWidth: 1200 },
  table: { width: "fit-content" }
})

export default function CardTable({ cards }) {
  const classes = styles()

  const [cardImageToPopover, setCardImageToPopover] = useState("")
  const [cardImagePopoverPosition, setCardImagePopoverPosition] = useState({
    top: "200px",
    left: "200px"
  })

  function handleMouseMove(e) {
    e.preventDefault()
    e.stopPropagation()

    setCardImageToPopover(e.target.parentNode.dataset.card)
    setCardImagePopoverPosition({ top: e.pageY - 50 + "px", left: e.pageX + 50 + "px" })
  }

  return (
    <Paper className={classes.root} onMouseMove={e => handleMouseMove(e)}>
      {cardImageToPopover && (
        <CardImagePopover cardImg={cardImageToPopover} anchorPosition={cardImagePopoverPosition} />
      )}
      <Table className={classes.table} size="small">
        <HeaderRow />
        <TableBody>
          {cards.map(card => (
            <CardRow data-cad={card} key={card.api_key} card={card} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
