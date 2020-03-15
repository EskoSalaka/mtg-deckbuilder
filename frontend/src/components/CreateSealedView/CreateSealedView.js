import React, { useState, useCallback, useEffect } from 'react'
import { Paper, Grid, Fab, Badge } from '@material-ui/core'

import styles from './styles'
import SetsTable from './SetsTable'
import AddBoosterPopover from './AddBoosterPopover'
import BoostersSnackbar from './BoostersSnackbar'
import DoneIcon from '@material-ui/icons/Done'

import setsService from '../../services/sets'
import decksService from '../../services/decks'
import SelectedBoostersMenu from './SelectedBoostersMenu'
import Loading from '../Common/Loading'
import AlertSnackbar from '../Common/AlertSnackbar'

export default function CreateSealedView() {
  const classes = styles()

  const [setsData, setsError, setsIsLoading] = setsService.useFetchSets()
  const [sendBoosters, createResponse, createError, createIsLoading] = decksService.useCreateDeck()
  console.log(setsData)

  const [anchorEl, setAnchorEl] = useState(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [popoverSetCode, setPopoverSetCode] = useState(null)
  const [boosters, setBoosters] = useState([])
  const [latestAdded, setLatestAdded] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [rollingID, setRollingID] = useState(1)

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    if (createResponse) {
      setAlertOpen(true)
      setAlertSeverity('success')
      setAlertMessage(createResponse.message)
    } else if (createError) {
      setAlertSeverity('error')
      setAlertOpen(true)

      setAlertMessage(createError.message)
    }
  }, [createResponse, createError])

  async function handleDone(e) {
    e.preventDefault()
    sendBoosters(boosters)
  }

  const handleAddButtonClick = useCallback((e) => {
    e.preventDefault()
    setPopoverSetCode(e.currentTarget.id)
    setAnchorEl(e.currentTarget)
  }, [])

  function handleAddBooster(e, booster) {
    e.preventDefault()
    const nb = {
      id: rollingID,
      set: popoverSetCode,
      commons: booster.commons,
      uncommons: booster.uncommons,
      rares: booster.rares,
      basicLands: booster.addBasicLand
    }

    setBoosters([...boosters, nb])

    setRollingID(rollingID + 1)
    setLatestAdded(nb)
    setShowSnackbar(true)
  }

  function handleCloseSnackbar(e, reason) {
    if (reason === 'clickaway') {
      return
    }

    setShowSnackbar(false)
  }

  function handleCloseAlert(e, reason) {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  function handleUndo() {
    setBoosters(boosters.filter((b) => b.id !== latestAdded.id))
    setShowSnackbar(false)
  }

  function handleOpenSelectedMenu(e) {
    setMenuAnchorEl(e.currentTarget)
  }

  function handleRemoveBooster(e, booster) {
    setBoosters(boosters.filter((b) => b.id !== booster.id))
  }

  if (setsError) throw setsError

  return (
    <div>
      {(setsIsLoading || createIsLoading) && <Loading />}
      <AlertSnackbar
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleCloseAlert}
      />
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.boostersfab}
        onClick={handleOpenSelectedMenu}
      >
        <Badge badgeContent={boosters.length} color='secondary'>
          <img
            src={process.env.PUBLIC_URL + '/tome.svg'}
            alt='Tome'
            className={classes.tomeIcon}
          ></img>
        </Badge>
      </Fab>
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.donefab}
        onClick={handleDone}
      >
        <DoneIcon />
      </Fab>

      <Grid container justify='center'>
        {setsData && (
          <Paper className={classes.paper}>
            <SetsTable
              setsData={setsData.data}
              handleAddButtonClick={handleAddButtonClick}
            ></SetsTable>
          </Paper>
        )}
        <BoostersSnackbar
          open={showSnackbar}
          booster={latestAdded}
          handleClose={handleCloseSnackbar}
          handleUndo={handleUndo}
        />

        <AddBoosterPopover
          anchorEl={anchorEl}
          handleClose={setAnchorEl}
          handleAddBooster={handleAddBooster}
        />
        <SelectedBoostersMenu
          boosters={boosters}
          anchorEl={menuAnchorEl}
          handleClose={setMenuAnchorEl}
          handleRemoveBooster={handleRemoveBooster}
        />
      </Grid>
    </div>
  )
}
