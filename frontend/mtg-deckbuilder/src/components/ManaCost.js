import React from "react"
import { makeStyles, Typography } from "@material-ui/core"

const styles = makeStyles({
  manaCost: { marginRight: "2px" }
})

function isBlank(str) {
  return !str || /^\s*$/.test(str)
}

export default function ManaCost({ manaCost }) {
  const classes = styles()
  const mscs = !isBlank(manaCost) ? manaCost.match(/[^{}]+(?=})/g) : []

  return (
    <>
      {mscs.map((c, i) => (
        <i
          key={c + i}
          className={`${classes.manaCost} ms ms-${c.toLowerCase()} ms-cost ms-shadow`}
        />
      ))}
    </>
  )
}
