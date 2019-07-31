import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import SetIcon from "./SetIcon"
import { Container, Typography } from "@material-ui/core"

const styles = makeStyles({
  topContainer: { display: "flex" },
  textContainer: {}
})

export default function SwitchButton({ stuff }) {
  const classes = styles()

  return (
    <Container className={classes.topContainer}>
      <SetIcon width={"80px"} height={""} colorStyle={"common"} setCode={set.code} />
      <Container className={classes.textContainer}>
        <Typography variant="h5" gutterbottom>
          {set.name} {`(${set.code.toUpperCase()})`}
        </Typography>
        <Typography variant="subtitle" gutterbottom>
          {`${set.card_count} cards`} <span>&#8281;</span> {`Released ${set.released_at}`}
        </Typography>
      </Container>
    </Container>
  )
}
