import React from "react"

import { storiesOf } from "@storybook/react"
import CardImageList from "../components/CardImageGrid"
import mock_cards from "./mock_cards.js"
import baseTheme from "../components/baseTheme"
import { MuiThemeProvider } from "@material-ui/core/styles"
import "./mana.css"

import CardInfoView from "../components/CardInfoView/CardInfoView"
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

storiesOf("Card info window", module).add("Full box", () => (
  <MuiThemeProvider muiTheme={baseTheme}>
    <CardInfoView card={c} />
  </MuiThemeProvider>
))

storiesOf("Set title", module).add("Set", () => (
  <MuiThemeProvider muiTheme={baseTheme}>
    <SetTitle set={set} />
  </MuiThemeProvider>
))
