import React, { useCallback } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { makeStyles } from '@material-ui/styles'
import { Typography, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import SetIcon from '../Common/SetIcon'

const styles = makeStyles({
  cellText: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '300px',
    texDecoration: 'none'
  },
  cell: {
    cursor: 'pointer',
    padding: '3px 6px 3px 11px',
    textDecoration: 'none',
    borderBottom: '1px solid #bfbfbf'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#e8e8e8;'
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'transparent'
    }
  },
  cellTextSecondary: {
    fontSize: 10,
    whiteSpace: 'pre'
  }
})

function SetRow({ set }) {
  const classes = styles()

  const history = useHistory()

  const handleClick = useCallback((e) => {
    history.push(`/cards/${set.code}`)
  })

  return (
    <TableRow hover className={classes.row} onClick={handleClick}>
      <TableCell key='name' className={classes.cell}>
        <Box display='flex'>
          <Box mr={2} display='flex'>
            <SetIcon setCode={set.code} colorStyle='common' width={18} />
          </Box>
          <Typography className={classes.cellText}>{set.name}</Typography>
          <Box ml={2} display='flex' color='text.secondary'>
            <Typography className={classes.cellTextSecondary}>{set.code.toUpperCase()}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell key='type' className={classes.cell}>
        <Typography className={classes.cellText}>{set.set_type}</Typography>
      </TableCell>
      <TableCell key='count' className={classes.cell}>
        <Typography className={classes.cellText}>{set.card_count}</Typography>
      </TableCell>
      <TableCell key='date' className={classes.cell}>
        <Typography className={classes.cellText}>{set.released_at}</Typography>
      </TableCell>
    </TableRow>
  )
}

export default React.memo(SetRow)
