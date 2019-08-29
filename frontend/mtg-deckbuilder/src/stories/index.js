import React from "react"

import { storiesOf } from "@storybook/react"
import mock_cards from "./mock_cards.js"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import "./mana.css"
import { cardSort, byCount } from "../components/Common/utils"
import DeckBuilderView from "../components/DeckBuilderView/DeckBuilderView"
import AddBasicLandsBox from "../components/DeckBuilderView/AddBasicLandsBox"
import { ThemeProvider } from "@material-ui/styles"
import { CssBaseline } from "@material-ui/core"
import baseTheme from "../components/baseTheme.js"
import ColorsPie from "../components/Common/StatsPlots/ColorsPie"
import TypesPie from "../components/Common/StatsPlots/TypesPie"
import SimpleTypesPie from "../components/Common/StatsPlots/SimpleTypesPie"
import ManaCostsBar from "../components/Common/StatsPlots/ManaCostsBar"
import FullStatsBox from "../components/Common/StatsPlots/FullStatsBox"
import DeckSection from "../components/DeckView/DeckSection"
import DeckContents from "../components/DeckView/DeckContents"
import LoginView from "../components/LoginView/LoginView"
import SignupView from "../components/SignupView/SignupView"
import CreateSealedView from "../components/CreateSealedView/CreateSealedView"

let c1 = mock_cards().slice(1, 100)
let c2 = mock_cards().slice(1, 50)
let c3 = mock_cards().slice(1, 20)
let c4 = mock_cards().slice(1, 10)

let cards = byCount(
  c1
    .concat(c2)
    .concat(c3)
    .concat(c4)
)

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

let d = {
  title: "Unnamed deck",
  created_at: "2019-07-12 12:11",
  cards: cards.slice(30, 100),
  sideboard: cards.slice(1, 10),
  user: "Esko"
}

storiesOf("Create sealed", module).add("Full", () => (
  <MuiThemeProvider theme={baseTheme()}>
    <CssBaseline />
    <CreateSealedView />
  </MuiThemeProvider>
))

storiesOf("Deck view", module)
  .add("Full", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <CssBaseline />
      <DeckContents deck={d} />
    </MuiThemeProvider>
  ))
  .add("One col", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <CssBaseline />
      <DeckSection cards={cards.slice(1, 10)} sectionName={"Commons"} />
    </MuiThemeProvider>
  ))

storiesOf("Deckbuilder card table", module)
  .add("One", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <CssBaseline />
      <DeckBuilderView cards={cards} />
    </MuiThemeProvider>
  ))
  .add("Basic lands", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <CssBaseline />
      <AddBasicLandsBox cards={cards} />
    </MuiThemeProvider>
  ))

storiesOf("Stats", module)
  .add("Full", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <FullStatsBox cards={cards} />
    </MuiThemeProvider>
  ))
  .add("By color", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <ColorsPie cards={cards} />
    </MuiThemeProvider>
  ))
  .add("By type", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <TypesPie cards={cards} />
    </MuiThemeProvider>
  ))
  .add("By simple type", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <SimpleTypesPie cards={cards} />
    </MuiThemeProvider>
  ))
  .add("By manacosts", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <ManaCostsBar cards={cards} />
    </MuiThemeProvider>
  ))

storiesOf("Auth", module)
  .add("Login", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <LoginView />
    </MuiThemeProvider>
  ))
  .add("Sign up", () => (
    <MuiThemeProvider theme={baseTheme()}>
      <SignupView />
    </MuiThemeProvider>
  ))
