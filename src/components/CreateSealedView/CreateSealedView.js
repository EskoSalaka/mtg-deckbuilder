import React, { useState, useCallback, useEffect } from 'react'
import { Paper, Grid, Fab, Badge, Box } from '@material-ui/core'

import styles from './styles'
import SetsTable from './SetsTable'
import AddBoosterPopover from './AddBoosterPopover'
import BoostersSnackbar from './BoostersSnackbar'
import DoneIcon from '@material-ui/icons/Done'

import sets from '../../api/sets'
import decks from '../../api/decks'
import SelectedBoostersMenu from './SelectedBoostersMenu'
import Loading from '../Common/Loading'
import AlertSnackbar from '../Common/AlertSnackbar'
import LoadingWrapper from '../Common/LoadingWrapper'

export default function CreateSealedView() {
  const classes = styles()

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

  const [{ data: setsData, error: setsError, loading: setsLoading }] = sets.useGetAll()
  const [
    { response: createResponse, error: createError, loading: createLoading },
    create,
  ] = decks.useCreate(boosters)

  useEffect(() => {
    if (createResponse) {
      setAlertOpen(true)
      setAlertSeverity('success')
      setAlertMessage('New deck created')
    } else if (createError) {
      setAlertSeverity('error')
      setAlertOpen(true)
      setAlertMessage(createError.response.data.message)
    }
  }, [createResponse, createError])

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
      basicLands: booster.addBasicLand,
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
    e.preventDefault()
    if (boosters.length) setMenuAnchorEl(e.currentTarget)
  }

  function handleRemoveBooster(e, booster) {
    setBoosters(boosters.filter((b) => b.id !== booster.id))
  }

  if (setsError) throw setsError
  if (setsLoading) return <Loading />

  return (
    <div>
      <AlertSnackbar
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleCloseAlert}
      />
      <Box position='fixed' margin={0} top='80px' left='auto' bottom='auto' right='25px'>
        <Box display='flex'>
          <Fab size='large' color='primary' aria-label='add' onClick={handleOpenSelectedMenu}>
            <Badge badgeContent={boosters.length} color='secondary'>
              <span className={classes.tomeIcon} />
            </Badge>
          </Fab>
          <Box ml={1}>
            <LoadingWrapper loading={createLoading} size={36}>
              <Fab size='large' color='primary' aria-label='add' onClick={create}>
                <DoneIcon />
              </Fab>
            </LoadingWrapper>
          </Box>
        </Box>
      </Box>

      <Grid container justify='center'>
        {setsData && (
          <Paper className={classes.paper}>
            <SetsTable
              setsData={setsData.sets}
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
