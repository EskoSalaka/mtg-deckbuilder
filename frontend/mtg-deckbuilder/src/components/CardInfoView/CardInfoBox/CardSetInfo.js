import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Container, Typography, Box } from "@material-ui/core"
import SetIcon from "../../SetIcon"

const styles = makeStyles({
  topContainer: {
    display: "flex",
    color: "black",
    textDecoration: "none",
    backgroundColor: "white",
    borderRadius: "6px",
    paddingLeft: 0
  },
  textContainer: {}
})

export default function CardSetInfo({ card }) {
  const classes = styles()

  return (
    <Box className={classes.topContainer} component="a" href="sss">
      <SetIcon width={"50px"} height={""} colorStyle={"rare"} setCode={card.set} />
      <Container className={classes.textContainer}>
        <Typography variant="h6" gutterbottom>
          {card.set_name} {`(${card.set.toUpperCase()})`}
        </Typography>
        <Typography variant="subtitle" gutterbottom>
          {`#${card.collector_number}`} <span>&#8281;</span>{" "}
          {card.released_at ? `Released  ${card.released_at}` : "Release Unknown"}
        </Typography>
      </Container>
    </Box>
  )
}
