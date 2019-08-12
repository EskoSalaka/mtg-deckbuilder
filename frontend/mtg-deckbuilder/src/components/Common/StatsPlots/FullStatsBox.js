import React from "react"
import ColorsPie from "./ColorsPie"
import ManaCostsBar from "./ManaCostsBar"
import SimpleTypesPie from "./SimpleTypesPie"
import { Paper, Grid, ExpansionPanel } from "@material-ui/core"

export default function FullStatsBox({ cards }) {
  return (
    <Paper>
      <Grid container>
        <ColorsPie cards={cards} />
        <SimpleTypesPie cards={cards} />
        <ManaCostsBar cards={cards} />
      </Grid>
    </Paper>
  )
}
