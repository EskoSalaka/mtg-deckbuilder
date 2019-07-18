import React from "react"
import Typography from "@material-ui/core/Typography"
import { Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    background: "#3d3d3d"
  },
  ftext: {
    marginTop: 10,
    color: "#969696"
  }
}))

export default function MTGDBFooter() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography
          className={classes.ftext}
          variant="subtitle1"
          align="left"
          color="textSecondary"
          component="p"
        >
          All the graphical and literal information and data related to Magic: The Gathering which
          can be handled with this software, such as card information and card images, is copyright
          © of Wizards of the Coast LLC, a Hasbro inc. subsidiary.
        </Typography>
        <Typography
          className={classes.ftext}
          variant="subtitle1"
          align="left"
          color="textSecondary"
          component="p"
        >
          The data for the backend database and the images mainly come from Scryfall's which is a
          copyright © by Scryfall LLC.
        </Typography>
        <Typography
          className={classes.ftext}
          variant="subtitle1"
          align="left"
          color="textSecondary"
          component="p"
        >
          This software is in no way endorsed or promoted by Scryfall, Wizards of the Coast or any
          other party. This software is free and is created for the purpose of learning, creating
          new Magic: The Gathering content and just for fun.
        </Typography>
      </Container>
    </footer>
  )
}
