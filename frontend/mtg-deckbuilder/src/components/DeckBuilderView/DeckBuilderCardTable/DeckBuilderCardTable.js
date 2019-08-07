import React, { useState, useEffect } from "react"
import styles from "./styles"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CRow from "./CRow"
import Header from "./Header"
import { sorted, byCount, includes, enhanched, incremented, decremented } from "../../Common/utils"

export default function DeckBuilderCardTable({ cards, handleTransfer }) {
  const classes = styles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("none")
  const [selected, setSelected] = useState([])
  const [cardsRef, setCardsRef] = useState(cards)

  function isSelected(card) {
    return selected.indexOf(card.id) !== -1
  }

  function handleSort(e, property) {
    setOrder(orderBy === property && order === "desc" ? "asc" : "desc")
    setOrderBy(property)
    setCardsRef(
      sorted(cardsRef, orderBy === property && order === "desc" ? "asc" : "desc", property)
    )
  }

  useEffect(() => {
    setCardsRef(cards)
  }, [cards])

  function handleClick(e, card) {
    if (e.type === "click") {
      console.log("====================================")
      console.log("left")
      console.log("====================================")
    } else if (e.type === "contextmenu") {
      console.log("====================================")
      console.log("Context")
      console.log("====================================")
    }
  }

  function handleDoubleClick(e, card) {
    console.log("Double")
    handleTransfer(card)
  }

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small">
        <Header order={order ? order : "none"} orderBy={orderBy} onSort={handleSort} />
        <TableBody>
          {cardsRef.map(card => (
            <CRow
              key={card.id}
              card={card}
              isSelected={isSelected(card)}
              handleClick={handleClick}
              handleDoubleClick={handleDoubleClick}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
