import React from "react"
import styles from "./styles"

export default function SetTitle({ typeLine }) {
  const classes = styles()
  const basicTypes = [
    "creature",
    "land",
    "artifact",
    "planeswalker",
    "instant",
    "sorcery",
    "enchantment"
  ]

  return (
    <>
      {typeLine
        .split(" ")
        .map((type, i) =>
          basicTypes.includes(type.toLowerCase()) ? (
            <i key={type + i} className={`${classes.typeLine} ms ms-${type.toLowerCase()}`} />
          ) : null
        )}
    </>
  )
}
