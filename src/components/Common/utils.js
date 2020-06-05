import { firstBy } from 'thenby'

var _ = require('lodash')

function isSealedWorthy(set) {
  const worthyTypes = [
    'core',
    'expansion',
    'masters',
    'cube',
    'commander',
    'draft_innovation',
    'planechase',
  ]

  if (_.includes(worthyTypes, set.set_type) && set.card_count >= 100) return true
  else return false
}

function getSealedWorthy(sets) {
  return sets.filter((s) => isSealedWorthy(s))
}

function groupSets(sets, indentifier) {
  return _.groupBy(sets, indentifier)
}

function frontFaceAttr(card, attr) {
  return card.layout === 'transform' || card.layout === 'double_faced_token'
    ? card.card_faces[0][attr]
    : card[attr]
}

function sorted(cards, order, orderBy) {
  if (orderBy === 'name') {
    return cards
      .slice(0)
      .sort(firstBy('name', { ignoreCase: true, direction: order === 'asc' ? -1 : 1 }))
  } else if (orderBy === 'type') {
    return cards.slice(0).sort(function (a, b) {
      const typeA = a.type_line.toLowerCase().replace('legendary ', '')
      const typeB = b.type_line.toLowerCase().replace('legendary ', '')

      if (typeA < typeB) return order === 'asc' ? -1 : 1
      if (typeA > typeB) return order === 'asc' ? +1 : -1
      return 0
    })
  } else if (orderBy === 'cost') {
    return cards.slice(0).sort(
      firstBy(function (a, b) {
        var colorA = a.color_identity ? a.color_identity.join() : ''
        var colorB = b.color_identity ? b.color_identity.join() : ''

        if (colorA < colorB) return order === 'asc' ? -1 : 1
        if (colorA > colorB) return order === 'asc' ? +1 : -1
        return 0
      })
        .thenBy(function (a, b) {
          var costA = a.cmc ? a.cmc : 0
          var costB = b.cmc ? b.cmc : 0

          if (costA < costB) return order === 'asc' ? -1 : 1
          if (costA > costB) return order === 'asc' ? +1 : -1
          return 0
        })
        .thenBy(function (a, b) {
          var costA = a.mana_cost ? a.mana_cost : ''
          var costB = b.mana_cost ? b.mana_cost : ''

          if (costA < costB) return order === 'asc' ? -1 : 1
          if (costA > costB) return order === 'asc' ? +1 : -1
          return 0
        })
    )
  } else {
    return cards.slice(0)
  }
}

function byCount(cards) {
  return Object.entries(_.groupBy(cards, 'id')).map((cc) => {
    let c = cc[1][0]
    c.count = cc[1].length
    return c
  })
}

function includes(cards, card) {
  return _.includes(
    cards.map((c) => c.id),
    card.id
  )
}

function decremented(cards, card) {
  return cards
    .map((c) => {
      if (c.id === card.id) c.count--
      return c
    })
    .filter((c) => {
      return c.count !== 0 ? c : null
    })
}

function incremented(cards, card) {
  if (includes(cards, card)) {
    return cards.map((c) => {
      if (c.id === card.id) c.count++
      return c
    })
  } else {
    const newCard = _.cloneDeep(card)
    newCard.count = 1
    return [...cards, newCard]
  }
}

function incrementedMany(cards, cardsToIncr) {
  let incrementedCards = _.cloneDeep(cards)

  for (var i = 0; i < cardsToIncr.length; i++) {
    incrementedCards = incremented(incrementedCards, cardsToIncr[i])
  }

  return incrementedCards
}

function decrementedMany(cards, cardsToDecr) {
  let decementedCards = _.cloneDeep(cards)

  for (var i = 0; i < cardsToDecr.length; i++) {
    decementedCards = decremented(decementedCards, cardsToDecr[i])
  }

  return decementedCards
}

function typeStats(cards) {
  return [
    {
      name: 'Creatures',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Creature') ? c.count : 0))),
    },
    {
      name: 'Lands',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Land') ? c.count : 0))),
    },
    {
      name: 'Planeswalkers',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Planeswalker') ? c.count : 0))),
    },
    {
      name: 'Instants',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Instant') ? c.count : 0))),
    },
    {
      name: 'Sorceries',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Sorcery') ? c.count : 0))),
    },
    {
      name: 'Artifacts',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Artifact') ? c.count : 0))),
    },
  ]
}

function simpleTypeStats(cards) {
  return [
    {
      name: 'Creatures',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Creature') ? c.count : 0))),
    },
    {
      name: 'Lands',
      value: _.sum(cards.map((c) => (_.includes(c.type_line, 'Land') ? c.count : 0))),
    },
    {
      name: 'Other',
      value: _.sum(
        cards.map((c) =>
          !_.includes(c.type_line, 'Creature') && !_.includes(c.type_line, 'Land') ? c.count : 0
        )
      ),
    },
  ]
}

function colorStats(cards) {
  const nonLands = cards.map((c) => (!_.includes(c.type_line, 'Land') ? c : false))

  return [
    {
      name: 'White',
      value: _.sum(nonLands.map((c) => (_.includes(c.color_identity, 'W') ? c.count : 0))),
    },
    {
      name: 'Blue',
      value: _.sum(nonLands.map((c) => (_.includes(c.color_identity, 'U') ? c.count : 0))),
    },
    {
      name: 'Black',
      value: _.sum(nonLands.map((c) => (_.includes(c.color_identity, 'B') ? c.count : 0))),
    },
    {
      name: 'Red',
      value: _.sum(nonLands.map((c) => (_.includes(c.color_identity, 'R') ? c.count : 0))),
    },
    {
      name: 'Green',
      value: _.sum(nonLands.map((c) => (_.includes(c.color_identity, 'G') ? c.count : 0))),
    },
    {
      name: 'Colorless',
      value: _.sum(cards.map((c) => (!c.color_identity.length ? c.count : 0))),
    },
  ]
}

function manaSymbols(cards) {
  // const nonLands = cards.map((c) => (!_.includes(c.type_line, 'Land') ? c : false))

  var costs = cards.map((c) => frontFaceAttr(c, 'mana_cost').repeat(c.count))
  costs = costs.join()

  return [
    {
      name: 'W',
      value: costs.split('W').length - 1,
    },
    {
      name: 'U',
      value: costs.split('U').length - 1,
    },
    {
      name: 'B',
      value: costs.split('B').length - 1,
    },
    {
      name: 'R',
      value: costs.split('R').length - 1,
    },
    {
      name: 'G',
      value: costs.split('G').length - 1,
    },
  ]
}

function manaCosts(cards) {
  const nonLands = cards.map((c) => (!_.includes(c.type_line, 'Land') ? c : false))

  return [
    {
      name: '<1',
      value: _.sum(nonLands.map((c) => (c.cmc && c.cmc <= 1 ? c.count : 0))),
    },
    {
      name: '2',
      value: _.sum(nonLands.map((c) => (c.cmc && c.cmc === 2 ? c.count : 0))),
    },
    {
      name: '3',
      value: _.sum(nonLands.map((c) => (c.cmc && c.cmc === 3 ? c.count : 0))),
    },
    {
      name: '4',
      value: _.sum(nonLands.map((c) => (c.cmc && c.cmc === 4 ? c.count : 0))),
    },
    {
      name: '5',
      value: _.sum(nonLands.map((c) => (c.cmc && c.cmc === 5 ? c.count : 0))),
    },
    {
      name: '6>',
      value: _.sum(nonLands.map((c) => (c.cmc && c.cmc > 5 ? c.count : 0))),
    },
  ]
}

function group(cards, identifier) {
  if (identifier === 'type') {
    return {
      Creatures: cards.filter((c) => _.includes(frontFaceAttr(c, 'type_line'), 'Creature')),
      Lands: cards.filter((c) => {
        const typeLine = frontFaceAttr(c, 'type_line')
        return _.includes(typeLine, 'Land') && !_.includes(typeLine, 'Creature') ? c : null
      }),
      Enchantments: cards.filter((c) => {
        const typeLine = frontFaceAttr(c, 'type_line')
        return _.includes(typeLine, 'Enchantent') && !_.includes(typeLine, 'Creature') ? c : null
      }),
      Instants: cards.filter((c) => {
        const typeLine = frontFaceAttr(c, 'type_line')
        return _.includes(typeLine, 'Instant') ? c : null
      }),
      Sorceries: cards.filter((c) => {
        const typeLine = frontFaceAttr(c, 'type_line')
        return _.includes(typeLine, 'Sorcery') ? c : null
      }),
      Planeswalkers: cards.filter((c) => {
        const typeLine = frontFaceAttr(c, 'type_line')
        return _.includes(typeLine, 'Planeswalker') ? c : null
      }),
      Artifacts: cards.filter((c) => {
        const typeLine = frontFaceAttr(c, 'type_line')
        return _.includes(typeLine, 'Artifact') &&
          !_.includes(typeLine, 'Creature') &&
          !_.includes(typeLine, 'Land')
          ? c
          : null
      }),
    }
  } else if (identifier === 'manacost') {
    return _.chain(cards).groupBy('cmc').value()
  } else if (identifier === 'color') {
    return _.chain(cards).groupBy('colors').value()
  }
}

function avgManaCost(cards) {
  const nonLands = cards.map((c) => (!_.includes(c.type_line, 'Land') ? c : false))
  const cs = nonLands.map((c) => (c.cmc ? c.cmc * c.count : null))

  return cs.length !== 0 ? _.sum(cs) / cs.length : 0
}

function count(cards) {
  return cards.length !== 0 ? _.sum(cards.map((c) => c.count)) : 0
}

export {
  isSealedWorthy,
  getSealedWorthy,
  frontFaceAttr,
  groupSets,
  sorted,
  byCount,
  includes,
  incremented,
  decremented,
  incrementedMany,
  decrementedMany,
  typeStats,
  colorStats,
  manaSymbols,
  manaCosts,
  simpleTypeStats,
  avgManaCost,
  count,
  group,
}
