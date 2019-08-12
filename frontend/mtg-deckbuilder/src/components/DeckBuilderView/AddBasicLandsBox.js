import React, { useState, useEffect } from "react"
import { Grid, Paper, TextField } from "@material-ui/core"
import styles from "./styles"

export default function AddBasicLandsBox({ cards }) {
  const classes = styles()
  const [lands, setLands] = useState({
    plains: 0,
    islands: 0,
    swamps: 0,
    mouintains: 0,
    forests: 0
  })

  function handleChange(e) {
    if (!isNaN(e.target.value) && e.target.value >= 0) {
      setLands({ ...lands, [e.target.id]: e.target.value })
    } else {
      setLands({ ...lands, [e.target.id]: 0 })
    }
  }

  return (
    <Paper className={classes.basicLandsPaper}>
      <Grid container className={classes.name} direction="column">
        <TextField
          id="plains"
          label="plains"
          variant="outlined"
          value={lands.plains}
          onChange={e => handleChange(e)}
          type="number"
          className={classes.textField}
          margin="dense"
        />
        <TextField
          id="islands"
          label="islands"
          value={lands.islands}
          variant="outlined"
          onChange={e => handleChange(e)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="dense"
        />
        <TextField
          id="swamps"
          label="swamps"
          value={lands.swamps}
          variant="outlined"
          onChange={e => handleChange(e)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="dense"
        />
        <TextField
          id="mouintains"
          label="mountains"
          value={lands.mouintains}
          variant="outlined"
          onChange={e => handleChange(e)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="dense"
        />
        <TextField
          id="forests"
          label="forests"
          value={lands.forests}
          variant="outlined"
          onChange={e => handleChange(e)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="dense"
        />
      </Grid>
    </Paper>
  )
}
