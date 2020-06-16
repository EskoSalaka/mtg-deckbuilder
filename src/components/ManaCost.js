import React from 'react'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  manaCost: { marginLeft: '2px' },
})

const ManaCost = ({ manaCost }) => {
  const classes = styles()
  let mscs = manaCost.includes('{') ? manaCost.match(/[^{}]+(?=})/g) : Array.from(manaCost)

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
