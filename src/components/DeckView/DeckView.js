import React, { useState, useCallback } from 'react'
import { Paper, Divider, Container, makeStyles } from '@material-ui/core'
import decks from '../../api/decks'

import MainboardSection from './MainboardSection'
import SideboardSection from './SideboardSection'
import DeckTitle from './DeckTitle'
import { useParams } from 'react-router-dom'

import CardImagePopover from '../Common/CardImagePopover'
import Loading from '../Common/Loading'

const styles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexGrow: 0,
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  deckListPaper: { padding: 10, maxWidth: 600 },
  divider: { marginTop: 15, marginBottom: 10 },
})

export default function DeckContents() {
  const classes = styles()
  let { deckID } = useParams()

  const [{ data, error, loading }] = decks.useGet(deckID)

  const [cardToShow, setCardToShow] = useState(null)
  const [imagePopoverPosition, setImagePopoverPosition] = useState(null)

  const handleMouseMove = useCallback((e, card) => {
    e.preventDefault()

    setImagePopoverPosition({ top: e.pageY - 50 + 'px', left: e.pageX + 50 + 'px' })
    setCardToShow(card)
  }, [])

  const handleMouseLeave = useCallback((e) => {
    e.preventDefault()
    setCardToShow(null)
  }, [])

  if (error) throw error

  return (
    <Container className={classes.mainContainer}>
      {cardToShow && <CardImagePopover card={cardToShow} anchorPosition={imagePopoverPosition} />}
      {loading && <Loading />}
      {data && (
        <Paper className={classes.deckListPaper}>
          <DeckTitle deck={data} />
          <Divider className={classes.divider} />
          <MainboardSection
            cards={data.mainboard}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
          />
          <Divider className={classes.divider} />
          <SideboardSection
            cards={data.sideboard}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
          />
        </Paper>
      )}
    </Container>
  )
}
