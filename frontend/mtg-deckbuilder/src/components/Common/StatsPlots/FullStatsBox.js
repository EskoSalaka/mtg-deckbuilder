import React from "react"
import ColorsPie from "./ColorsPie"
import ManaCostsBar from "./ManaCostsBar"
import TypesPie from "./TypesPie"
import { Paper, Grid, ExpansionPanel } from "@material-ui/core"

export default function FullStatsBox({ cards }) {
  return (
    <ExpansionPanel>
      <Paper>
        <Grid container>
          <ColorsPie cards={cards} />
          <TypesPie cards={cards} />
          <ManaCostsBar cards={cards} />
        </Grid>
      </Paper>
    </ExpansionPanel>
  )
}
