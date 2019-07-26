import React from "react"

import { storiesOf } from "@storybook/react"
import CardImageList from "../components/CardImageGrid"
import mock_cards from "./mock_cards.js"
import LegalityIndicator from "../components/CardInfoBox/LegalityIndicator"
import CardLegalityGrid from "../components/CardInfoBox/CardLegalityGrid"
import CardTextBox from "../components/CardInfoBox/CardOracleTextBox"
import baseTheme from "../components/baseTheme"
import { MuiThemeProvider } from "@material-ui/core/styles"
import "./mana.css"
import CardTitleBox from "../components/CardInfoBox/CardTitleBox"
import CardInfoBox from "../components/CardInfoBox/CardInfoBox"
import CardImage from "../components/CardImage/CardImage"
import CardTable from "../components/CardTable/CardTable"

let cards = mock_cards()
let c = cards[0]

storiesOf("Card image grid", module).add("Full list", () => (
  <MuiThemeProvider muiTheme={baseTheme}>
    <CardImageList cards={cards} />
  </MuiThemeProvider>
))
storiesOf("Card table", module).add("Full list", () => <CardTable cards={cards} />)

storiesOf("Card image", module).add("Image", () => <CardImage card={c} />)

storiesOf("Card info window", module)
  .add("Full box", () => (
    <MuiThemeProvider muiTheme={baseTheme}>
      <CardInfoBox card={c} />
    </MuiThemeProvider>
  ))
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
  .add("card Title", () => (
    <MuiThemeProvider muiTheme={baseTheme}>
      <CardTitleBox cardName={c.name} cardManaCost={c.mana_cost} />
    </MuiThemeProvider>
  ))
