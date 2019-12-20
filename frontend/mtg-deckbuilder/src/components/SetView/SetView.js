import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"

import queryString from "query-string"
import setsService from "../../services/sets"
import CardImageGrid from "../CardImageGrid/CardImageGrid"
import CardTable from "../CardTable"
import {
  Container,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core"
import styles from "./styles"
import SetTitle from "./SetTitle"

function SetView({ match, location, history }) {
  const classes = styles()
  const setCode = match.params.code
  const searchparams = queryString.parse(location.search)
  console.log("====================================")
  console.log("Set")
  console.log(match)
  console.log(searchparams)
  console.log(location)
  console.log(history)
  console.log("====================================")

  const {
    data: cardsData,
    error: cardsError,
    isLoading: isLoadingCards
  } = setsService.useFetchSetData(`${setCode}/cards/`)

  const { data: setdata, error: setError, isLoading: isLoadingSet } = setsService.useFetchSetData(
    `${setCode}/`
  )

  const [show, setShow] = useState(
    ["checklist", "images"].includes(searchparams.show) ? searchparams.show : "images"
  )
  const [sortBy, setSortBy] = useState(location.search.sortBy ? location.search.sortBy : "Name")

  console.log("====================================")
  console.log("show", show)
  console.log("====================================")

  function handleChange(e) {
    console.log("====================================")
    console.log(e.target)
    console.log("====================================")
    if (e.target.name === "show") {
      setShow(e.target.value)
    }
  }

  return (
    <div>
      {cardsData && setdata && (
        <>
          <AppBar position="sticky" color="default">
            <Container maxWidth="lg">
              <Toolbar className={classes.subToolbar} variant="dense">
                <SetTitle set={setdata}></SetTitle>
                <div className={classes.grow} />
                <FormControl className={classes.formControl}>
                  <InputLabel>Show</InputLabel>
                  <Select
                    id="show"
                    value={show}
                    MenuProps={{
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      }
                    }}
                    inputProps={{
                      name: "show",
                      id: "show"
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={"checklist"}>Checklist</MenuItem>
                    <MenuItem value={"images"}>Images</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    MenuProps={{
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      }
                    }}
                    value={10}
                    inputProps={{
                      name: "sort",
                      id: "sort"
                    }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Toolbar>
            </Container>
          </AppBar>
          <Container className={classes.mainContainer}>
            {show === "images" ? (
              <CardImageGrid cards={cardsData.data} />
            ) : (
              <CardTable cards={cardsData.data}></CardTable>
            )}
          </Container>
        </>
      )}
    </div>
  )
}

export default withRouter(SetView)
