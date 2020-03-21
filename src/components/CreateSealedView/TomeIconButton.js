import React from "react"
import { IconButton, Badge } from "@material-ui/core"

import styles from "./styles"

export default function TomeIconButton({ boosters, handleClick }) {
  const classes = styles()

  return (
    <IconButton className={classes.tomeIconButton} edge="start" onClick={handleClick}>
      <Badge badgeContent={boosters.length} color="secondary">
        <img
          src={process.env.PUBLIC_URL + "/tome.svg"}
          alt="Tome"
          className={classes.tomeIcon}
        ></img>
      </Badge>
    </IconButton>
  )
}
