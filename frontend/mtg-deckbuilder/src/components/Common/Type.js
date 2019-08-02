import React from "react"
import styles from "./styles"

export default function SetTitle({ typeline }) {
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
      {typeline
        .split(" ")
        .map((type, i) =>
          basicTypes.includes(type.toLowerCase()) ? (
            <i key={type + i} className={`${classes.typeLine.toLowerCase()} ms ms-${type}`} />
          ) : null
        )}
    </>
  )
}
