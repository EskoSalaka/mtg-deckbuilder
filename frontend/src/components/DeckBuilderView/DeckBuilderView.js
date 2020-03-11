import React, { useState, useEffect, useCallback } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Drawer,
  Box,
  Paper,
  Snackbar
} from '@material-ui/core'

import styles from './styles'
import DeckBuildeCardTable from './DeckBuilderCardTable'
import { incrementedMany, decrementedMany, count } from '../Common/utils'
import FullStatsBox from '../Common/StatsPlots/FullStatsBox'
import CardImage from '../CardImage'
import AddBasicLandsBox from './AddBasicLandsBox'

import decksService from '../../services/decks'
import { byCount } from '../Common/utils'
import { useParams } from 'react-router-dom'
import AlertSnackbar from '../Common/AlertSnackbar'
import Loading from '../Common/Loading'

export default function DeckBuilderView() {
  const classes = styles()
  const { deckID } = useParams()

  const [deckData, error, isLoading] = decksService.useGetDeck(deckID)
  const [editDeck, response, editError, editIsLoading] = decksService.useEditDeck(deckID)

  const [mainBoard, setMainBoard] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [showStats, setShowStats] = useState(false)
  const [cardToShow, setCardToShow] = useState(null)
  const [sbTransferTrigger, setSbTransferTrigger] = useState(0)
  const [dTransferTrigger, setDTransferTrigger] = useState(0)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    setSideboard(deckData ? byCount(deckData.sideboard) : [])
    setMainBoard(deckData ? byCount(deckData.mainboard) : [])
  }, [deckData])

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

  const handleClose = (e, reason) => {
    console.log(e, reason)

    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  if (isLoading) return <Loading />
  console.log(response, editError, editIsLoading)

  return (
    <div>
      {editIsLoading && <Loading />}
      <AlertSnackbar
        open={editError ? true : false}
        severity={'error'}
        message={'kaka'}
        handleClose={handleClose}
      />
      <AppBar position='static' color='default' className={classes.deckbuilderAppbar}>
        <Toolbar className={classes.deckBuilderToolbar}>
          <Button
            color='primary'
            edge='end'
            onClick={() => (showStats ? setShowStats(false) : setShowStats(true))}
          >
            Show stats
          </Button>
          <Button color='primary' edge='end' onClick={handleDoneButtonClick}>
            Done
          </Button>
        </Toolbar>
      </AppBar>
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
                cards={sideboard}
                handleTransfer={sbToDeck}
                setImage={setCardToShow}
                transferTrigger={sbTransferTrigger}
              />
            </Grid>
            <Grid item>
              <Box justifyContent='center' display='grid' mt='100px'>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => setSbTransferTrigger(sbTransferTrigger + 1)}
                >
                  <ArrowForwardIosIcon />
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => setDTransferTrigger(dTransferTrigger + 1)}
                >
                  <ArrowBackIosIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant='h6'>{`Deck (${count(mainBoard)})`}</Typography>
              <DeckBuildeCardTable
                cards={mainBoard}
                handleTransfer={deckToSb}
                setImage={setCardToShow}
                transferTrigger={dTransferTrigger}
              />
            </Grid>
            <Grid container item xs>
              <Box className={classes.cardImageBox} ml='auto'>
                {cardToShow && <CardImage card={cardToShow} />}
              </Box>
              <Box ml='auto'>
                <AddBasicLandsBox />
              </Box>
            </Grid>
          </Grid>
          <Drawer anchor='top' open={showStats} onClose={() => setShowStats(false)}>
            <FullStatsBox cards={mainBoard} direction={'row'} />
          </Drawer>
        </Paper>
      </Box>
    </div>
  )
}
