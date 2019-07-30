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
import SetTitle from "../components/SetView/SetTitle"

let cards = mock_cards().slice(1, 100)
let set = {
  card_count: 344,
  code: "m20",
  digital: false,
  foil_only: false,
  id: "4a787360-9767-4f44-80b1-2405dc5e39c7",
  mtgo_code: "m20",
  name: "Core Set 2020",
  released_at: "2019-07-12",
  scryfall_uri: "https://scryfall.com/sets/m20",
  set_type: "core"
}
let c = cards[0]

storiesOf("Card image grid", module).add("Full list", () => (
  <MuiThemeProvider muiTheme={baseTheme}>
    <CardImageList cards={cards} />
  </MuiThemeProvider>
))
storiesOf("Card table", module).add("Full list", () => (
  <MuiThemeProvider muiTheme={baseTheme}>
    <CardTable cards={cards} />
  </MuiThemeProvider>
))

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

storiesOf("Set title", module).add("Set", () => (
  <MuiThemeProvider muiTheme={baseTheme}>
    <SetTitle set={set} />
  </MuiThemeProvider>
))
