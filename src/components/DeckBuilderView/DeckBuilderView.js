import React, { useState, useEffect, useCallback, createRef, useRef } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Grid, Typography, Button, Drawer, Box, Paper, Fab, Popover } from '@material-ui/core'

import styles from './styles'
import DeckBuildeCardTable from './DeckBuilderCardTable'
import { incrementedMany, decrementedMany, count, byCount } from '../Common/utils'
import FullStatsBox from '../Common/StatsPlots/FullStatsBox'
import CardImage from '../CardImage'
import DoneIcon from '@material-ui/icons/Done'
import LandscapeIcon from '@material-ui/icons/Landscape'
import PieChartIcon from '@material-ui/icons/PieChart'

import decksService from '../../services/decks'

import { useParams } from 'react-router-dom'
import AddBasicLandsBox from './AddBasicLandsBox'
import AlertSnackbar from '../Common/AlertSnackbar'
import Loading from '../Common/Loading'
import getBasicLands from './BasicLands'

const basicLands = getBasicLands()

export default function DeckBuilderView() {
  const classes = styles()
  const { deckID } = useParams()

  const [deckData, deckError, isLoading] = decksService.useGetUserDeck(deckID)
  const [editDeck, editResponse, editError, editIsLoading] = decksService.useEditDeck(deckID)

  const [mainBoard, setMainBoard] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [showStats, setShowStats] = useState(false)
  const [cardToShow, setCardToShow] = useState(null)

  const [basicLandsOpen, setBasicLandsOpen] = useState(false)
  const [basicLandsAnchorEl, setBasicLandsAnchorEl] = useState(null)

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const mainboardRef = useRef()
  const sideboardRef = useRef()
  console.log(mainboardRef)

  useEffect(() => {
    setSideboard(deckData ? deckData.sideboard : [])
    setMainBoard(deckData ? deckData.mainboard : [])
  }, [deckData])

  useEffect(() => {
    if (editResponse) {
      setAlertOpen(true)
      setAlertSeverity('success')
      setAlertMessage(editResponse.message)
    } else if (editError) {
      setAlertOpen(true)
      setAlertSeverity('error')
      setAlertMessage(editError.message)
    }
  }, [editResponse, editError])

  const sbToDeck = useCallback(
    (cards) => {
      setMainBoard(incrementedMany(mainBoard, cards))
      setSideboard(decrementedMany(sideboard, cards))
    },
    [mainBoard, sideboard]
  )

  const deckToSb = useCallback(
    (cards) => {
      setMainBoard(decrementedMany(mainBoard, cards))
      setSideboard(incrementedMany(sideboard, cards))
    },
    [mainBoard, sideboard]
  )

  function handleDoneButtonClick(e) {
    e.preventDefault()

    editDeck({
      mainboard: mainBoard,
      sideboard: sideboard,
      api_id: deckData.api_id,
      name: deckData.name
    })
  }

  function handleAddLandButtonClick(e) {
    setMainBoard(incrementedMany(mainBoard, [basicLands[e.currentTarget.id]]))
  }

  function handleRemoveLandButtonClick(e) {
    setMainBoard(decrementedMany(mainBoard, [basicLands[e.currentTarget.id]]))
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

  if (isLoading) return <Loading />
  if (deckError) {
    console.log(deckError, deckError.response.status, deckError.headers)
    console.log(JSON.stringify(deckError))
  }

  return (
    <div>
      {editIsLoading && <Loading />}
      <AlertSnackbar
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleClose}
      />
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.statsfab}
        onClick={() => (showStats ? setShowStats(false) : setShowStats(true))}
      >
        <PieChartIcon />
      </Fab>
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.donefab}
        onClick={handleDoneButtonClick}
      >
        <DoneIcon />
      </Fab>
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.landsfab}
        onClick={handleOpenBasicLands}
      >
        <LandscapeIcon />
      </Fab>
      <Popover
        open={basicLandsOpen}
        onClose={handleCloseLands}
        anchorEl={basicLandsAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <AddBasicLandsBox
          handleAddButtonClick={handleAddLandButtonClick}
          handleRemoveButtonClick={handleRemoveLandButtonClick}
        />
      </Popover>
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
              <Typography variant='h6'>{`Sideboard (${count(sideboard)})`}</Typography>
              <DeckBuildeCardTable
                ref={sideboardRef}
                cards={sideboard}
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
              <Typography variant='h6'>{`Deck (${count(mainBoard)})`}</Typography>
              <DeckBuildeCardTable
                ref={mainboardRef}
                cards={mainBoard}
                handleTransfer={deckToSb}
                setImage={setCardToShow}
              />
            </Grid>
          </Grid>

          <Drawer anchor='top' open={showStats} onClose={() => setShowStats(false)}>
            <FullStatsBox cards={mainBoard} direction={'row'} />
          </Drawer>
        </Paper>
        <Box className={classes.cardImageBox} ml={5}>
          {<CardImage card={cardToShow} />}
        </Box>
      </Box>
    </div>
  )
}
