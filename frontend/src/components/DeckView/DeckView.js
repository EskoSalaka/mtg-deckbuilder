import React, { useState, useEffect, useCallback } from 'react'
import { Grid, Paper, Divider, Container } from '@material-ui/core'
import styles from './styles'
import decksService from '../../services/decks'
import { group } from '../Common/utils'
import DeckSection from './DeckSection'
import SideboardSection from './SideboardSection'
import DeckTitle from './DeckTitle'
import { useParams } from 'react-router-dom'
import { byCount } from '../Common/utils'

import CardImagePopover from '../Common/CardImagePopover'
import Loading from '../Common/Loading'

export default function DeckContents() {
  const classes = styles()
  let { deckID } = useParams()

  const [deckData, deckError, isLoading] = decksService.useGetDeck(deckID)
  const [mainBoard, setMainBoard] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [groups, setGroups] = useState([])
  const [groupNames, setGroupNames] = useState([])
  const [groupBy, setGroupBy] = useState('type')
  const [cardToShow, setCardToShow] = useState(null)
  const [imagePopoverPosition, setImagePopoverPosition] = useState(null)
  console.log(groups, groupNames)

  const handleMouseMove = useCallback((e, card) => {
    e.preventDefault()

    setImagePopoverPosition({ top: e.pageY - 50 + 'px', left: e.pageX + 50 + 'px' })
    setCardToShow(card)
  }, [])

  const handleMouseLeave = useCallback((e, card) => {
    e.preventDefault()
    setCardToShow(null)
  }, [])

  useEffect(() => {
    setSideboard(deckData ? byCount(deckData.sideboard) : [])
    setMainBoard(deckData ? byCount(deckData.mainboard) : [])
  }, [deckData])

  useEffect(() => {
    setGroups(group(mainBoard, groupBy))
    console.log(groups)

    setGroupNames(Object.keys(groups).sort((g1, g2) => groups[g1].length < groups[g2].length))
  }, [mainBoard])

  if (deckError) throw deckError

  return (
    <Container className={classes.mainContainer}>
      {cardToShow && <CardImagePopover card={cardToShow} anchorPosition={imagePopoverPosition} />}
      {isLoading && <Loading />}
      {deckData && (
        <Paper className={classes.deckListPaper}>
          <DeckTitle deck={deckData} />
          <Divider className={classes.divider} />
          <Grid container direction='row' spacing={2}>
            <Grid item xs={8}>
              <Grid container direction='row' spacing={2}>
                {groupNames.map((groupName) => {
                  return groups[groupName].length ? (
                    <Grid item xs={4} ms={4} lg={4} key={groupName}>
                      <DeckSection
                        cards={groups[groupName]}
                        sectionName={groupName}
                        handleMouseMove={handleMouseMove}
                        handleMouseLeave={handleMouseLeave}
                      />
                    </Grid>
                  ) : null
                })}
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />

          <SideboardSection
            cards={sideboard}
            sectionName={'Sideaboard'}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
          />
        </Paper>
      )}
    </Container>
  )
}
