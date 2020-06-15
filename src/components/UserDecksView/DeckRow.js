import React, { useCallback, useState, useEffect } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import decks from '../../api/decks'
import { makeStyles } from '@material-ui/styles'
import { Typography, Box, Tooltip } from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ManaCost from '../ManaCost'
import LoadingWrapper from '../Common/LoadingWrapper'
import AlertSnackbar from '../Common/AlertSnackbar'

const styles = makeStyles({
  cellText: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    texDecoration: 'none',
  },
  cell: {
    cursor: 'pointer',
    padding: '3px 6px 3px 11px',
    textDecoration: 'none',
    borderBottom: '1px solid #bfbfbf',
  },
  lastCell: {
    padding: '3px 6px 3px 4px',
    paddingRight: '0px',
    whiteSpace: 'pre',
    textDecoration: 'none',
    borderBottom: '1px solid #bfbfbf',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#e8e8e8;',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'transparent',
    },
  },
  cellTextSecondary: {
    fontSize: 10,
    whiteSpace: 'pre',
  },
})

function DeckRow({ deckInfo }) {
  const classes = styles()
  const history = useHistory()

  const [{ response, error, loading }, deleteDeck] = decks.useDelete(deckInfo.api_id)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  var deckColorStr = ''

  for (const color of deckInfo.colors) {
    deckColorStr = deckColorStr + '{' + color + '}'
  }

  const handleRowClick = useCallback(
    (e) => {
      e.preventDefault()
      history.push(`/decks/${deckInfo.api_id}`)
    },
    [deckInfo, history]
  )

  const handleDeleteButtonClick = useCallback(
    (e) => {
      e.preventDefault()
      deleteDeck()
    },
    [deleteDeck]
  )

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  useEffect(() => {
    if (error) {
      setAlertMessage('Something went wrong. Try again later')
      setAlertOpen(true)
    }
  }, [error])

  console.log(response)

  if (response?.status === 200) return null

  return (
    <TableRow className={classes.row}>
      <TableCell key='name' className={classes.cell} onClick={handleRowClick}>
        <Box display='flex'>
          <Typography className={classes.cellText}>{deckInfo.name}</Typography>
          <Box ml={2} display='flex'>
            <AlertSnackbar open={alertOpen} message={alertMessage} handleClose={handleCloseAlert} />
            <Typography className={classes.cellText}>
              <ManaCost manaCost={deckColorStr} />
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell key='cards' className={classes.cell} onClick={handleRowClick}>
        <Typography className={classes.cellText}>
          {deckInfo.mainboard_card_count} / {deckInfo.sideboard_card_count}
        </Typography>
      </TableCell>
      <TableCell key='added' className={classes.cell} onClick={handleRowClick}>
        <Typography className={classes.cellText}>{deckInfo.created_at}</Typography>
      </TableCell>
      <TableCell key='tools1' className={classes.lastCell}>
        <Tooltip title='Edit deck' aria-label='Edit deck'>
          <IconButton
            color='primary'
            size='small'
            component={Link}
            to={`/decks/edit/${deckInfo.api_id}`}
            className={classes.button}
            replace
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell key='tools2' className={classes.lastCell}>
        <LoadingWrapper loading={loading} thickness={3} size={28}>
          <Tooltip title='Delete deck' aria-label='Delete deck'>
            <IconButton color='primary' size='small' onClick={handleDeleteButtonClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </LoadingWrapper>
      </TableCell>
    </TableRow>
  )
}

export default React.memo(DeckRow)
