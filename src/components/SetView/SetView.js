import React, { useState, useCallback } from 'react'

import { useParams } from 'react-router-dom'

import sets from '../../api/sets'
import CardImageGrid from '../CardImageGrid/CardImageGrid'
import CardTable from '../CardTable'
import {
  Container,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import styles from './styles'
import SetTitle from './SetTitle'
import Loading from '../Common/Loading'
import CardImagePopover from '../Common/CardImagePopover'

export default function SetView() {
  const classes = styles()
  const { code } = useParams()

  const [{ data: cardsData, error: cardsError, loading: loadingCards }] = sets.useGetCards(code)
  const [{ data: setdata, error: setError, loading: loadingSet }] = sets.useGet(code)

  const [show, setShow] = useState('checklist')
  const [cardToPopover, setCardToPopover] = useState(null)
  const [showCardPopover, setShowCardPopover] = useState(false)
  const [cardPopoverPosition, setCardPopoverPosition] = useState({
    top: '200px',
    left: '200px',
  })

  const handleMouseMove = useCallback((e, card) => {
    e.preventDefault()
    setCardToPopover(card)
    setShowCardPopover(true)
    setCardPopoverPosition({ top: e.pageY - 50 + 'px', left: e.pageX + 50 + 'px' })
  }, [])

  const handleMouseLeave = useCallback((e) => {
    e.preventDefault()

    setShowCardPopover(false)
  }, [])

  const handleChange = useCallback((e) => {
    if (e.target.name === 'show') {
      setShow(e.target.value)
    }
  }, [])

  if (cardsError) throw cardsError
  if (setError) throw setError

  return (
    <div>
      {(loadingCards || loadingSet) && <Loading />}
      {cardsData && setdata && (
        <>
          {showCardPopover && (
            <CardImagePopover card={cardToPopover} anchorPosition={cardPopoverPosition} />
          )}
          <AppBar position='sticky' color='default'>
            <Container maxWidth='lg'>
              <Toolbar className={classes.subToolbar} variant='dense'>
                <SetTitle set={setdata}></SetTitle>
                <div className={classes.grow} />
                <FormControl className={classes.formControl}>
                  <InputLabel>Show</InputLabel>
                  <Select
                    id='show'
                    value={show}
                    MenuProps={{
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                    }}
                    inputProps={{
                      name: 'show',
                      id: 'show',
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={'checklist'}>Checklist</MenuItem>
                    <MenuItem value={'images'}>Images</MenuItem>
                  </Select>
                </FormControl>
              </Toolbar>
            </Container>
          </AppBar>
          <Container className={classes.mainContainer}>
            {show === 'images' ? (
              <CardImageGrid cards={cardsData.cards} />
            ) : (
              <CardTable
                cards={cardsData.cards}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
              />
            )}
          </Container>
        </>
      )}
    </div>
  )
}
