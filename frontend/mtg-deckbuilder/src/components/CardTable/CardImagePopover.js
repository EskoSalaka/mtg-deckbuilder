import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Popover } from "@material-ui/core"
import CardImage from "../CardImage/"

const styles = makeStyles({
  popover: { zIndex: 10000000000, position: "relative" }
})

export default function CardImagePopover({ card, anchorPosition }) {
  const classes = styles()

  return (
    <Popover
      open
      className={classes.popover}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
    >
      <img className={classes.fCardImage} src={card} alt={card.name} width="200px" />
    </Popover>
  )
}
