import React from 'react'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  manaCost: { marginLeft: '2px' }
})

function isBlank(str) {
  return !str || /^\s*$/.test(str)
}

function ManaCost({ manaCost }) {
  const classes = styles()
  const mscs = !isBlank(manaCost) ? manaCost.match(/[^{}]+(?=})/g) : []

  return (
    <>
      {mscs &&
        mscs.map((c, i) => (
          <i
            key={c + i}
            className={`${classes.manaCost} ms ms-${c.toLowerCase()} ms-cost ms-shadow`}
          />
        ))}
    </>
  )
}

export default React.memo(ManaCost)
