import React, { useState, useEffect, useCallback, useRef } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Grid, Typography, Button, Drawer, Box, Paper, Fab, Popover } from '@material-ui/core'

import styles from './styles'
import DeckBuildeCardTable from './DeckBuilderCardTable'
import { incrementedMany, decrementedMany, count } from '../Common/utils'
import FullStatsBox from '../Common/StatsPlots/FullStatsBox'
import CardImage from '../CardImage'
import DoneIcon from '@material-ui/icons/Done'
import LandscapeIcon from '@material-ui/icons/Landscape'
import PieChartIcon from '@material-ui/icons/PieChart'

import decks from '../../api/decks'

import { useParams } from 'react-router-dom'
import AddBasicLandsBox from './AddBasicLandsBox'
import AlertSnackbar from '../Common/AlertSnackbar'
import Loading from '../Common/Loading'
import getBasicLands from './BasicLands'
import LoadingWrapper from '../Common/LoadingWrapper'

const basicLands = getBasicLands()

export default function DeckBuilderView() {
  const classes = styles()
  const { deckID } = useParams()
  const [deck, setDeck] = useState({
    api_id: -1,
    created_at: '',
    mainboard: [],
    name: '',
    sideboard: [],
    user: '',
  })

  const [{ data: deckData, error: deckError, loading: deckLoading }] = decks.useGetUserDeck(deckID)
  const [
    { response: editResponse, error: editError, loading: editLoading },
    editDeck,
  ] = decks.useEdit(deck)

  const [showStats, setShowStats] = useState(false)
  const [cardToShow, setCardToShow] = useState(null)

  const [basicLandsOpen, setBasicLandsOpen] = useState(false)
  const [basicLandsAnchorEl, setBasicLandsAnchorEl] = useState(null)

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const mainboardRef = useRef()
  const sideboardRef = useRef()

  useEffect(() => {
    if (deckData) setDeck({ ...deckData })
  }, [deckData])

  useEffect(() => {
    if (editResponse) {
      setAlertOpen(true)
      setAlertSeverity('success')
      setAlertMessage(editResponse.data.message)
    } else if (editError) {
      setAlertOpen(true)
      setAlertSeverity('error')
      setAlertMessage('Something went wrong. Try again later')
    }
  }, [editResponse, editError])

  const sbToDeck = useCallback(
    (cards) => {
      setDeck({
        ...deck,
        mainboard: incrementedMany(deck.mainboard, cards),
        sideboard: decrementedMany(deck.sideboard, cards),
      })
    },
    [deck]
  )

  const deckToSb = useCallback(
    (cards) => {
      setDeck({
        ...deck,
        mainboard: decrementedMany(deck.mainboard, cards),
        sideboard: incrementedMany(deck.sideboard, cards),
      })
    },
    [deck]
  )

  function handleAddLandButtonClick(e) {
    setDeck({
      ...deck,
      mainboard: incrementedMany(deck.mainboard, [basicLands[e.currentTarget.id]]),
    })
  }

  function handleRemoveLandButtonClick(e) {
    setDeck({
      ...deck,
      mainboard: decrementedMany(deck.mainboard, [basicLands[e.currentTarget.id]]),
    })
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  const handleCloseLands = (e) => {
    setBasicLandsOpen(false)
  }

  const handleOpenBasicLands = (e) => {
    setBasicLandsOpen(true)
    setBasicLandsAnchorEl(e.currentTarget)
  }

  if (deckLoading) return <Loading />

  if (deckError) throw deckError

  return (
    <div>
      <Box display='flex' justifyContent='center' p='10px'>
        <Paper className={classes.topPaper}>
          <Grid
            className={classes.contentsGrid}
            direction='row'
            spacing={2}
            container
            justify='flex-start'
            alignItems='flex-start'
          >
            <Grid item>
              <Typography variant='h6'>{`Sideboard (${count(deck.sideboard)})`}</Typography>
              <DeckBuildeCardTable
                ref={sideboardRef}
                cards={deck.sideboard}
                handleTransfer={sbToDeck}
                setImage={setCardToShow}
              />
            </Grid>
            <Grid item>
              <Box justifyContent='center' display='grid' mt='100px'>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => sideboardRef.current.transferSelected()}
                >
                  <ArrowForwardIosIcon />
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => mainboardRef.current.transferSelected()}
                >
                  <ArrowBackIosIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant='h6'>{`Deck (${count(deck.mainboard)})`}</Typography>
              <DeckBuildeCardTable
                ref={mainboardRef}
                cards={deck.mainboard}
                handleTransfer={deckToSb}
                setImage={setCardToShow}
              />
            </Grid>
          </Grid>

          <Drawer anchor='top' open={showStats} onClose={() => setShowStats(false)}>
            <FullStatsBox cards={deck.mainboard} direction={'row'} />
          </Drawer>
        </Paper>
        <Box className={classes.cardImageBox} ml={5}>
          {<CardImage card={cardToShow} />}
        </Box>
      </Box>
      <AlertSnackbar
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleClose}
      />

      <Box position='fixed' margin={0} top='auto' left='auto' bottom='120px' right='25px'>
        <Box display='flex'>
          <Fab
            size='large'
            color='primary'
            aria-label='add'
            onClick={() => (showStats ? setShowStats(false) : setShowStats(true))}
          >
            <PieChartIcon />
          </Fab>
          <Box ml={1}>
            <Fab size='large' color='primary' aria-label='add' onClick={handleOpenBasicLands}>
              <LandscapeIcon />
            </Fab>
          </Box>
          <Box ml={1}>
            <LoadingWrapper loading={editLoading} size={36}>
              <Fab size='large' color='primary' aria-label='add' onClick={editDeck}>
                <DoneIcon />
              </Fab>
            </LoadingWrapper>
          </Box>
        </Box>
      </Box>
      <Popover
        open={basicLandsOpen}
        onClose={handleCloseLands}
        anchorEl={basicLandsAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <AddBasicLandsBox
          handleAddButtonClick={handleAddLandButtonClick}
          handleRemoveButtonClick={handleRemoveLandButtonClick}
        />
      </Popover>
    </div>
  )
}
