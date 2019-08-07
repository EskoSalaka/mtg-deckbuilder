import React from "react"
import { firstBy } from "thenby"

var _ = require("lodash")

function sorted(cards, order, orderBy) {
  if (orderBy === "name") {
    return cards
      .slice(0)
      .sort(firstBy("name", { ignoreCase: true, direction: order === "asc" ? -1 : 1 }))
  } else if (orderBy === "type") {
    return cards.slice(0).sort(function(a, b) {
      const typeA = a.type_line.toLowerCase().replace("legendary ", "")
      const typeB = b.type_line.toLowerCase().replace("legendary ", "")

      if (typeA < typeB) return order === "asc" ? -1 : 1
      if (typeA > typeB) return order === "asc" ? +1 : -1
      return 0
    })
  } else if (orderBy === "cost") {
    return cards.slice(0).sort(
      firstBy(function(a, b) {
        var colorA = a.color_identity ? a.color_identity.join() : ""
        var colorB = b.color_identity ? b.color_identity.join() : ""

        if (colorA < colorB) return order === "asc" ? -1 : 1
        if (colorA > colorB) return order === "asc" ? +1 : -1
        return 0
      })
        .thenBy(function(a, b) {
          var costA = a.cmc ? a.cmc : 0
          var costB = b.cmc ? b.cmc : 0

          if (costA < costB) return order === "asc" ? -1 : 1
          if (costA > costB) return order === "asc" ? +1 : -1
          return 0
        })
        .thenBy(function(a, b) {
          var costA = a.mana_cost ? a.mana_cost : ""
          var costB = b.mana_cost ? b.mana_cost : ""

          if (costA < costB) return order === "asc" ? -1 : 1
          if (costA > costB) return order === "asc" ? +1 : -1
          return 0
        })
    )
  }
}

function byCount(cards) {
  return Object.entries(_.groupBy(cards, "id")).map(cc => {
    let c = cc[1][0]
    c.count = cc[1].length
    return c
  })
}

function includes(cards, card) {
  return _.includes(cards.map(c => c.id), card.id)
}

function decremented(cards, card) {
  return cards
    .map(c => {
      if (c.id === card.id) c.count = c.count - 1
      return c
    })
    .filter(c => {
      return c.count !== 0 ? c : null
    })
}

function incremented(cards, card) {
  if (includes(cards, card)) {
    return cards.map(c => {
      if (c.id === card.id) c.count = c.count + 1
      return c
    })
  } else {
    const newCard = _.clone(card)
    newCard.count = 1
    return [...cards, newCard]
  }
}

export { sorted, byCount, includes, incremented, decremented }
