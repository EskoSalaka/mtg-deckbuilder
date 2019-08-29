import React, { useState, useEffect } from "react"
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Popover,
  Grid
} from "@material-ui/core"
import styles from "./styles"

export default function AddBoosterPopover({ anchorEl, handleClose, handleAddBooster }) {
  const classes = styles()

  const [booster, setBooster] = useState({
    commons: 11,
    uncommons: 3,
    rares: 1,
    addBasicLand: false
  })

  function handleChange(e) {
    if (e.target.id === "addBasicLand") {
      setBooster({ ...booster, [e.target.id]: e.target.checked })
    } else {
      if (!isNaN(e.target.value) && e.target.value >= 0) {
        setBooster({ ...booster, [e.target.id]: e.target.value })
      } else {
        setBooster({ ...booster, [e.target.id]: 0 })
      }
    }
  }

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => handleClose()}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left"
      }}
    >
      <Box p={2}>
        <Grid container direction="column" spacing={1}>
          <Grid container item direction="row" spacing={1}>
            <Grid item xs={4}>
              <TextField
                className={classes.boosterTextField}
                id="commons"
                label="Commons"
                variant="outlined"
                value={booster.commons}
                onChange={e => handleChange(e)}
                type="number"
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.boosterTextField}
                id="uncommons"
                label="Uncommons"
                variant="outlined"
                value={booster.uncommons}
                onChange={e => handleChange(e)}
                type="number"
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.boosterTextField}
                id="rares"
                label="Rares"
                variant="outlined"
                value={booster.rares}
                onChange={e => handleChange(e)}
                type="number"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid container item direction="row">
            <Grid item xs={9}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="addBasicLand"
                    checked={booster.addBasicLand}
                    onChange={e => handleChange(e)}
                    color="primary"
                    label="End"
                  />
                }
                label="Include basic land"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={e => handleAddBooster(e, booster)}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Popover>
  )
}
