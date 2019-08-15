import React, { useState, useMemo, useEffect } from "react"
import styles from "./styles"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CRow from "./CRow"
import Header from "./Header"
import { sorted } from "../../Common/utils"

export default function DeckBuilderCardTable({ cards, handleTransfer, setImage, transferTrigger }) {
  const classes = styles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("none")
  const [selected, setSelected] = useState([])

  useEffect(() => {
    console.log("trig")
    handleTransfer(cards.filter(c => isSelected(c.id)))
  }, [transferTrigger])

  var sortedCards = useMemo(() => {
    return sorted(cards, order, orderBy)
  }, [cards, order, orderBy])

  function isSelected(cardId) {
    return selected.indexOf(cardId) !== -1
  }

  function handleSort(e, property) {
    setOrder(orderBy === property && order === "desc" ? "asc" : "desc")
    setOrderBy(property)
  }

  function transferSelected() {
    handleTransfer(cards.filter(c => isSelected(c.id)))
  }

  function handleMouseOver(e, card) {
    e.preventDefault()
    setImage(card)

    if (e.ctrlKey && e.buttons === 1 && !isSelected(card.id)) {
      setSelected([...selected, card.id])
    }
  }

  function handleMouseDown(e, card) {
    e.preventDefault()

    if (e.ctrlKey) {
      if (!isSelected(card.id)) setSelected([...selected, card.id])
      else setSelected(selected.filter(id => id !== card.id))
    } else setSelected([card.id])
  }

  function handleDoubleClick(e, card) {
    handleTransfer([card])
  }

  function handleKeyPress(e) {
    e.preventDefault()

    if (e.key === "ArrowDown") {
      if (selected.length === 0) setSelected(cards[0].id)
      else {
        const ids = sortedCards.map(c => c.id)
        const cur = ids.indexOf(selected[selected.length - 1])
        const next = cur === sortedCards.length - 1 ? cur : cur + 1

        setSelected([ids[next]])
        setImage(sortedCards[next])
      }
    } else if (e.key === "ArrowUp") {
      if (selected.length === 0) setSelected(cards[0].id)
      else {
        const ids = sortedCards.map(c => c.id)
        const cur = ids.indexOf(selected[selected.length - 1])
        const next = cur === 0 ? cur : cur - 1

        setSelected([ids[next]])
        setImage(sortedCards[next])
      }
    } else if (e.key === "Enter") {
      transferSelected()
    }
  }

  return (
    <Paper className={classes.paper}>
      <Table
        tabIndex="1"
        className={classes.table}
        size="small"
        selectable="false"
        onKeyDown={handleKeyPress}
      >
        <Header order={order ? order : "none"} orderBy={orderBy} onSort={handleSort} />
        <TableBody>
          {sortedCards.map(card => (
            <CRow
              key={card.id}
              card={card}
              isSelected={isSelected(card.id)}
              handleMouseDown={handleMouseDown}
              handleDoubleClick={handleDoubleClick}
              handleMouseOver={handleMouseOver}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
