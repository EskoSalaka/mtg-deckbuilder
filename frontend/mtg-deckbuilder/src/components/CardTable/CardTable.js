import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CardRow from "./CardRow"
import CardImagePopover from "./CardImagePopover"
import { CardHeader } from "@material-ui/core"

const styles = makeStyles({
  root: {},
  table: {},
  headerCell: {
    head: {
      backgroundColor: "black",
      color: "white"
    },
    body: {
      fontSize: 18
    }
  }
})

export default function CardTable({ cards }) {
  const classes = styles()

  const [cardImageToPopover, setCardToPopover] = useState(cards[3].image_uris.normal)
  const [showCardImagePopover, setShowCardImagePopover] = useState(false)
  const [cardImagePopoverPosition, setCardImagePopoverPosition] = useState({ top: 200, left: 200 })
  const [cardImagePopoverX, setCardImagePopoverX] = useState("200px")
  const [cardImagePopoverY, setCardImagePopoverY] = useState("200px")

  function handleClick(e) {
    e.preventDefault()
  }

  function handleMouseMove(e) {
    setCardImagePopoverY(80)
    setCardImagePopoverX(60)
  }

  function handleMouseLeave(e) {
    e.preventDefault()
    setShowCardImagePopover(false)
    setCardToPopover(null)

    setCardImagePopoverPosition({ top: 0, left: 0 })
  }

  return (
    <Paper className={classes.root}>
      <div
        display={"block"}
        style={{
          display: "block",
          position: "absolute",
          left: cardImagePopoverX,
          top: cardImagePopoverY
        }}
      >
        <img
          width="200px"
          height="300px"
          src="https://img.scryfall.com/cards/large/front/8/3/83f43730-1c1f-4150-8771-d901c54bedc4.jpg?1563799521"
        />
      </div>

      <Table className={classes.table} size="small">
        <CardHeader />
        <TableBody onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
          {cards.map(card => (
            <CardRow card={card} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
