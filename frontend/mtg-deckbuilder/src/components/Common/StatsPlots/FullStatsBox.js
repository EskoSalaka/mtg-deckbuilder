import React from "react"
import ColorsPie from "./ColorsPie"
import ManaCostsBar from "./ManaCostsBar"
import SimpleTypesPie from "./SimpleTypesPie"
import { Paper, Grid, ExpansionPanel } from "@material-ui/core"

export default function FullStatsBox({ cards, direction }) {
  return (
    <Paper>
      <Grid container direction={direction} justify="center" alignItems="center">
        <ColorsPie cards={cards} />
        <SimpleTypesPie cards={cards} />
        <ManaCostsBar cards={cards} />
      </Grid>
    </Paper>
  )
}
