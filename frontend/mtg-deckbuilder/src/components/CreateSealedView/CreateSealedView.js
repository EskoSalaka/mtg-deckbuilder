import React, { useState, useEffect } from "react"
import { Paper, AppBar, Toolbar, Button, Grid } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

import styles from "./styles"
import SetsTable from "./SetsTable"
import AddBoosterPopover from "./AddBoosterPopover"
import BoostersSnackbar from "./BoostersSnackbar"
import TomeIconButton from "./TomeIconButton"

import setsService from "../../services/sets"
import SelectedBoostersMenu from "./SelectedBoostersMenu"

export default function CreateSealedView({ match }) {
  const classes = styles()

  const { data, error, isLoading } = setsService.useFetchSetData("")

  const [anchorEl, setAnchorEl] = useState(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [popoverSetCode, setPopoverSetCode] = useState(null)
  const [boosters, setBoosters] = useState([])
  const [latestAdded, setLatestAdded] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [rollingID, setRollingID] = useState(1)

  function handleAddButtonClick(e) {
    e.preventDefault()
    console.log("====================================")
    console.log(e.currentTarget.id)
    console.log("====================================")
    setPopoverSetCode(e.currentTarget.id)
    setAnchorEl(e.currentTarget)
  }

  function handleAddBooster(e, booster) {
    e.preventDefault()
    const nb = {
      id: rollingID,
      set: popoverSetCode,
      commons: booster.commons,
      uncommons: booster.uncommons,
      rares: booster.rares
    }

    setBoosters([...boosters, nb])

    setRollingID(rollingID + 1)
    setLatestAdded(nb)
    setShowSnackbar(true)
  }

  function handleCloseSnackbar(e, reason) {
    if (reason === "clickaway") {
      return
    }

    setShowSnackbar(false)
  }

  function handleUndo() {
    setBoosters(boosters.filter(b => b.id !== latestAdded.id))
    setShowSnackbar(false)
  }

  function handleOpenSelectedMenu(e) {
    setMenuAnchorEl(e.currentTarget)
  }

  function handleRemoveBooster(e, booster) {
    setBoosters(boosters.filter(b => b.id !== booster.id))
  }

  return (
    <div>
      <AppBar position="static" color="default" className={classes.createSealedAppbar}>
        <Toolbar className={classes.deckBuilderToolbar}>
          <TomeIconButton boosters={boosters} handleClick={handleOpenSelectedMenu} />
          <Button variant="contained" color="primary" edge="end">
            Done
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        {isLoading && <CircularProgress />}
        {data && (
          <Paper className={classes.paper}>
            <SetsTable setsData={data.data} handleAddButtonClick={handleAddButtonClick}></SetsTable>
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
