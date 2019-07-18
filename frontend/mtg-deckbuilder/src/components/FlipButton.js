import React from "react"
import { makeStyles } from "@material-ui/styles"
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty"
import { Fab } from "@material-ui/core"

const styles = makeStyles(theme => ({
  flipButton: {
    marginTop: "40px",
    marginLeft: "150px",
    position: "absolute",
    opacity: 0.4,
    width: 60,
    height: 50,
    "&:hover": {
      opacity: 0.7
    }
  }
}))

export default function FlipButton({ isVisible, onClickHandler }) {
  const classes = styles()

  if (isVisible) {
    return (
      <Fab color="primary" className={classes.flipButton} onClick={onClickHandler} size="medium">
        <ThreeSixtyIcon fontSize="large" />
      </Fab>
    )
  } else {
    return null
  }
}
