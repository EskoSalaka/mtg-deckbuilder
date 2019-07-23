import React from "react"

import { storiesOf } from "@storybook/react"
import CardImageList from "../components/CardImageGrid"
import mock_cards from "./mock_cards.js"
import LegalityIndicator from "../components/LegalityIndicator"
import CardLegalityGrid from "../components/CardLegalityGrid"
import CardTextBox from "../components/CardTextBox"
import baseTheme from "../components/baseTheme"
import { MuiThemeProvider } from "@material-ui/core/styles"
import "./mana.css"

let cards = mock_cards()
let c = cards[105]

storiesOf("cardImageGrid", module).add("Full list", () => <CardImageList cards={cards} />)
storiesOf("Card info window", module)
  .add("Negative legality indicator", () => (
    <LegalityIndicator format={"oldschool"} legality={c.legalities.oldschool} />
  ))
  .add("Positive legality indicator", () => (
    <LegalityIndicator format={"Commander"} legality={c.legalities.commander} />
  ))
  .add("Full legality grid for a card", () => <CardLegalityGrid card={c} />)
  .add("card Text", () => (
    <MuiThemeProvider muiTheme={baseTheme}>
      <CardTextBox card={c} />
    </MuiThemeProvider>
  ))
