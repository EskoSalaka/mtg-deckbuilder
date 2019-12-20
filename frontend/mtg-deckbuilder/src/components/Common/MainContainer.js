import React from "react"
import { Container } from "@material-ui/core"
import styles from "./styles"

export default function MainContainer() {
  const classes = styles()

  return <Container className={classes.mainContainer} maxWidth="lg" />
}
