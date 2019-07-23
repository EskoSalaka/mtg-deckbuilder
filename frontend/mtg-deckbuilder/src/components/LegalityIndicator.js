import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Card } from "@material-ui/core"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const styles = makeStyles({
  negative: {
    backgroundColor: "#8a1d1dab",
    width: 90
  },
  positive: {
    backgroundColor: "#5e8847d9",
    width: 90
  },
  content: {
    justifyContent: "center",
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    "&:last-child": {
      paddingBottom: 5
    }
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
    color: "white",
    fontFamily: "monospace"
  }
})

export default function LegalityIndicator({ format, legality }) {
  const classes = styles()

  return (
    <Card className={legality === "legal" ? classes.positive : classes.negative}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} variant="h5" component="h2">
          {format.toUpperCase()}
        </Typography>
      </CardContent>
    </Card>
  )
}
