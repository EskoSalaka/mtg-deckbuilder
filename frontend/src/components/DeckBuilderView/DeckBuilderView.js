import React, { useState, useEffect, useCallback } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Grid, Typography, Button, Drawer, Box, Paper, Fab, Popover } from '@material-ui/core'

import styles from './styles'
import DeckBuildeCardTable from './DeckBuilderCardTable'
import { incrementedMany, decrementedMany, count, byCount } from '../Common/utils'
import FullStatsBox from '../Common/StatsPlots/FullStatsBox'
import CardImage from '../CardImage'
import DoneIcon from '@material-ui/icons/Done'
import LandscapeIcon from '@material-ui/icons/Landscape'
import PieChartIcon from '@material-ui/icons/PieChart'

import decksService from '../../services/decks'

import { useParams } from 'react-router-dom'
import AddBasicLandsBox from './AddBasicLandsBox'
import AlertSnackbar from '../Common/AlertSnackbar'
import Loading from '../Common/Loading'

const basicLands = {
  forest: {
    count: 1,
    object: 'card',
    id: 'b3ed8a17-ce32-4100-8ffc-fb8af1c35142',
    oracle_id: 'b34bb2dc-c1af-4d77-b0b3-a0fb342a5fc6',
    multiverse_ids: [9683],
    tcgplayer_id: 855,
    name: 'Forest',
    lang: 'en',
    released_at: '1998-08-11',
    uri: 'https://api.scryfall.com/cards/b3ed8a17-ce32-4100-8ffc-fb8af1c35142',
    scryfall_uri: 'https://scryfall.com/card/ugl/88/forest?utm_source=api',
    layout: 'normal',
    highres_image: true,
    image_uris: {
      small:
        'https://img.scryfall.com/cards/small/front/b/3/b3ed8a17-ce32-4100-8ffc-fb8af1c35142.jpg?1562799145',
      normal:
        'https://img.scryfall.com/cards/normal/front/b/3/b3ed8a17-ce32-4100-8ffc-fb8af1c35142.jpg?1562799145',
      large:
        'https://img.scryfall.com/cards/large/front/b/3/b3ed8a17-ce32-4100-8ffc-fb8af1c35142.jpg?1562799145',
      png:
        'https://img.scryfall.com/cards/png/front/b/3/b3ed8a17-ce32-4100-8ffc-fb8af1c35142.png?1562799145',
      art_crop:
        'https://img.scryfall.com/cards/art_crop/front/b/3/b3ed8a17-ce32-4100-8ffc-fb8af1c35142.jpg?1562799145',
      border_crop:
        'https://img.scryfall.com/cards/border_crop/front/b/3/b3ed8a17-ce32-4100-8ffc-fb8af1c35142.jpg?1562799145'
    },
    mana_cost: '',
    cmc: 0,
    type_line: 'Basic Land — Forest',
    oracle_text: '({T}: Add {G}.)',
    colors: [],
    color_identity: ['G'],
    legalities: {
      standard: 'legal',
      future: 'legal',
      historic: 'legal',
      pioneer: 'legal',
      modern: 'legal',
      legacy: 'legal',
      pauper: 'legal',
      vintage: 'legal',
      penny: 'legal',
      commander: 'legal',
      brawl: 'legal',
      duel: 'legal',
      oldschool: 'not_legal'
    },
    games: ['paper'],
    reserved: false,
    foil: false,
    nonfoil: true,
    oversized: false,
    promo: false,
    reprint: true,
    variation: false,
    set: 'ugl',
    set_name: 'Unglued',
    set_type: 'funny',
    set_uri: 'https://api.scryfall.com/sets/3404fc78-6678-4cf4-bd39-4c0be3bb7baf',
    set_search_uri: 'https://api.scryfall.com/cards/search?order=set&q=e%3Augl&unique=prints',
    scryfall_set_uri: 'https://scryfall.com/sets/ugl?utm_source=api',
    rulings_uri: 'https://api.scryfall.com/cards/b3ed8a17-ce32-4100-8ffc-fb8af1c35142/rulings',
    prints_search_uri:
      'https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ab34bb2dc-c1af-4d77-b0b3-a0fb342a5fc6&unique=prints',
    collector_number: '88',
    digital: false,
    rarity: 'common',
    card_back_id: '0aeebaf5-8c7d-4636-9e82-8c27447861f7',
    artist: 'Terese Nielsen',
    artist_ids: ['eb55171c-2342-45f4-a503-2d5a75baf752'],
    illustration_id: 'c6459625-ca08-4275-bb95-912cebb70adf',
    border_color: 'black',
    frame: '1997',
    full_art: true,
    textless: false,
    booster: true,
    story_spotlight: false,
    prices: {
      usd: '7.24',
      usd_foil: null,
      eur: '3.19',
      tix: null
    },
    related_uris: {
      gatherer: 'https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=9683',
      tcgplayer_decks:
        'https://decks.tcgplayer.com/magic/deck/search?contains=Forest&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      edhrec: 'https://edhrec.com/route/?cc=Forest',
      mtgtop8: 'https://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Forest'
    },
    purchase_uris: {
      tcgplayer:
        'https://shop.tcgplayer.com/product/productsearch?id=855&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      cardmarket:
        'https://www.cardmarket.com/en/Magic/Products/Singles/Unglued/Forest?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall',
      cardhoarder:
        'https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Forest&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall'
    }
  },
  island: {
    count: 1,
    object: 'card',
    id: '547f89f2-30a0-493a-914e-6251d2574099',
    oracle_id: 'b2c6aa39-2d2a-459c-a555-fb48ba993373',
    multiverse_ids: [9677],
    tcgplayer_id: 873,
    name: 'Island',
    lang: 'en',
    released_at: '1998-08-11',
    uri: 'https://api.scryfall.com/cards/547f89f2-30a0-493a-914e-6251d2574099',
    scryfall_uri: 'https://scryfall.com/card/ugl/85/island?utm_source=api',
    layout: 'normal',
    highres_image: true,
    image_uris: {
      small:
        'https://img.scryfall.com/cards/small/front/5/4/547f89f2-30a0-493a-914e-6251d2574099.jpg?1562799096',
      normal:
        'https://img.scryfall.com/cards/normal/front/5/4/547f89f2-30a0-493a-914e-6251d2574099.jpg?1562799096',
      large:
        'https://img.scryfall.com/cards/large/front/5/4/547f89f2-30a0-493a-914e-6251d2574099.jpg?1562799096',
      png:
        'https://img.scryfall.com/cards/png/front/5/4/547f89f2-30a0-493a-914e-6251d2574099.png?1562799096',
      art_crop:
        'https://img.scryfall.com/cards/art_crop/front/5/4/547f89f2-30a0-493a-914e-6251d2574099.jpg?1562799096',
      border_crop:
        'https://img.scryfall.com/cards/border_crop/front/5/4/547f89f2-30a0-493a-914e-6251d2574099.jpg?1562799096'
    },
    mana_cost: '',
    cmc: 0,
    type_line: 'Basic Land — Island',
    oracle_text: '({T}: Add {U}.)',
    colors: [],
    color_identity: ['U'],
    legalities: {
      standard: 'legal',
      future: 'legal',
      historic: 'legal',
      pioneer: 'legal',
      modern: 'legal',
      legacy: 'legal',
      pauper: 'legal',
      vintage: 'legal',
      penny: 'legal',
      commander: 'legal',
      brawl: 'legal',
      duel: 'legal',
      oldschool: 'not_legal'
    },
    games: ['paper'],
    reserved: false,
    foil: false,
    nonfoil: true,
    oversized: false,
    promo: false,
    reprint: true,
    variation: false,
    set: 'ugl',
    set_name: 'Unglued',
    set_type: 'funny',
    set_uri: 'https://api.scryfall.com/sets/3404fc78-6678-4cf4-bd39-4c0be3bb7baf',
    set_search_uri: 'https://api.scryfall.com/cards/search?order=set&q=e%3Augl&unique=prints',
    scryfall_set_uri: 'https://scryfall.com/sets/ugl?utm_source=api',
    rulings_uri: 'https://api.scryfall.com/cards/547f89f2-30a0-493a-914e-6251d2574099/rulings',
    prints_search_uri:
      'https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ab2c6aa39-2d2a-459c-a555-fb48ba993373&unique=prints',
    collector_number: '85',
    digital: false,
    rarity: 'common',
    card_back_id: '0aeebaf5-8c7d-4636-9e82-8c27447861f7',
    artist: 'Daren Bader',
    artist_ids: ['7da1a585-c875-45e4-b322-5da9e8e1f651'],
    illustration_id: '0ab4218a-b89f-4016-a57c-9c6e309e0a25',
    border_color: 'black',
    frame: '1997',
    full_art: true,
    textless: false,
    booster: true,
    story_spotlight: false,
    prices: {
      usd: '5.71',
      usd_foil: null,
      eur: '4.68',
      tix: null
    },
    related_uris: {
      gatherer: 'https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=9677',
      tcgplayer_decks:
        'https://decks.tcgplayer.com/magic/deck/search?contains=Island&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      edhrec: 'https://edhrec.com/route/?cc=Island',
      mtgtop8: 'https://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Island'
    },
    purchase_uris: {
      tcgplayer:
        'https://shop.tcgplayer.com/product/productsearch?id=873&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      cardmarket:
        'https://www.cardmarket.com/en/Magic/Products/Singles/Unglued/Island?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall',
      cardhoarder:
        'https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Island&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall'
    }
  },
  swamp: {
    count: 1,
    object: 'card',
    id: '69384f97-3333-4aa7-bc4f-928ba49a2c80',
    oracle_id: '56719f6a-1a6c-4c0a-8d21-18f7d7350b68',
    multiverse_ids: [9676],
    tcgplayer_id: 906,
    name: 'Swamp',
    lang: 'en',
    released_at: '1998-08-11',
    uri: 'https://api.scryfall.com/cards/69384f97-3333-4aa7-bc4f-928ba49a2c80',
    scryfall_uri: 'https://scryfall.com/card/ugl/86/swamp?utm_source=api',
    layout: 'normal',
    highres_image: true,
    image_uris: {
      small:
        'https://img.scryfall.com/cards/small/front/6/9/69384f97-3333-4aa7-bc4f-928ba49a2c80.jpg?1562799109',
      normal:
        'https://img.scryfall.com/cards/normal/front/6/9/69384f97-3333-4aa7-bc4f-928ba49a2c80.jpg?1562799109',
      large:
        'https://img.scryfall.com/cards/large/front/6/9/69384f97-3333-4aa7-bc4f-928ba49a2c80.jpg?1562799109',
      png:
        'https://img.scryfall.com/cards/png/front/6/9/69384f97-3333-4aa7-bc4f-928ba49a2c80.png?1562799109',
      art_crop:
        'https://img.scryfall.com/cards/art_crop/front/6/9/69384f97-3333-4aa7-bc4f-928ba49a2c80.jpg?1562799109',
      border_crop:
        'https://img.scryfall.com/cards/border_crop/front/6/9/69384f97-3333-4aa7-bc4f-928ba49a2c80.jpg?1562799109'
    },
    mana_cost: '',
    cmc: 0,
    type_line: 'Basic Land — Swamp',
    oracle_text: '({T}: Add {B}.)',
    colors: [],
    color_identity: ['B'],
    legalities: {
      standard: 'legal',
      future: 'legal',
      historic: 'legal',
      pioneer: 'legal',
      modern: 'legal',
      legacy: 'legal',
      pauper: 'legal',
      vintage: 'legal',
      penny: 'legal',
      commander: 'legal',
      brawl: 'legal',
      duel: 'legal',
      oldschool: 'not_legal'
    },
    games: ['paper'],
    reserved: false,
    foil: false,
    nonfoil: true,
    oversized: false,
    promo: false,
    reprint: true,
    variation: false,
    set: 'ugl',
    set_name: 'Unglued',
    set_type: 'funny',
    set_uri: 'https://api.scryfall.com/sets/3404fc78-6678-4cf4-bd39-4c0be3bb7baf',
    set_search_uri: 'https://api.scryfall.com/cards/search?order=set&q=e%3Augl&unique=prints',
    scryfall_set_uri: 'https://scryfall.com/sets/ugl?utm_source=api',
    rulings_uri: 'https://api.scryfall.com/cards/69384f97-3333-4aa7-bc4f-928ba49a2c80/rulings',
    prints_search_uri:
      'https://api.scryfall.com/cards/search?order=released&q=oracleid%3A56719f6a-1a6c-4c0a-8d21-18f7d7350b68&unique=prints',
    collector_number: '86',
    digital: false,
    rarity: 'common',
    card_back_id: '0aeebaf5-8c7d-4636-9e82-8c27447861f7',
    artist: 'Mark Zug',
    artist_ids: ['48e2b98c-5467-4671-bd42-4c3746115117'],
    illustration_id: '4096f8f7-94d1-4f7a-a15b-a35ce04d1a93',
    border_color: 'black',
    frame: '1997',
    full_art: true,
    textless: false,
    booster: true,
    story_spotlight: false,
    prices: {
      usd: '4.63',
      usd_foil: null,
      eur: '3.01',
      tix: null
    },
    related_uris: {
      gatherer: 'https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=9676',
      tcgplayer_decks:
        'https://decks.tcgplayer.com/magic/deck/search?contains=Swamp&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      edhrec: 'https://edhrec.com/route/?cc=Swamp',
      mtgtop8: 'https://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Swamp'
    },
    purchase_uris: {
      tcgplayer:
        'https://shop.tcgplayer.com/product/productsearch?id=906&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      cardmarket:
        'https://www.cardmarket.com/en/Magic/Products/Singles/Unglued/Swamp?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall',
      cardhoarder:
        'https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Swamp&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall'
    }
  },
  mountain: {
    count: 1,
    object: 'card',
    id: '8e3c2e1a-181e-4275-ad09-51c9de039d32',
    oracle_id: 'a3fb7228-e76b-4e96-a40e-20b5fed75685',
    multiverse_ids: [9707],
    tcgplayer_id: 888,
    name: 'Mountain',
    lang: 'en',
    released_at: '1998-08-11',
    uri: 'https://api.scryfall.com/cards/8e3c2e1a-181e-4275-ad09-51c9de039d32',
    scryfall_uri: 'https://scryfall.com/card/ugl/87/mountain?utm_source=api',
    layout: 'normal',
    highres_image: true,
    image_uris: {
      small:
        'https://img.scryfall.com/cards/small/front/8/e/8e3c2e1a-181e-4275-ad09-51c9de039d32.jpg?1562799121',
      normal:
        'https://img.scryfall.com/cards/normal/front/8/e/8e3c2e1a-181e-4275-ad09-51c9de039d32.jpg?1562799121',
      large:
        'https://img.scryfall.com/cards/large/front/8/e/8e3c2e1a-181e-4275-ad09-51c9de039d32.jpg?1562799121',
      png:
        'https://img.scryfall.com/cards/png/front/8/e/8e3c2e1a-181e-4275-ad09-51c9de039d32.png?1562799121',
      art_crop:
        'https://img.scryfall.com/cards/art_crop/front/8/e/8e3c2e1a-181e-4275-ad09-51c9de039d32.jpg?1562799121',
      border_crop:
        'https://img.scryfall.com/cards/border_crop/front/8/e/8e3c2e1a-181e-4275-ad09-51c9de039d32.jpg?1562799121'
    },
    mana_cost: '',
    cmc: 0,
    type_line: 'Basic Land — Mountain',
    oracle_text: '({T}: Add {R}.)',
    colors: [],
    color_identity: ['R'],
    legalities: {
      standard: 'legal',
      future: 'legal',
      historic: 'legal',
      pioneer: 'legal',
      modern: 'legal',
      legacy: 'legal',
      pauper: 'legal',
      vintage: 'legal',
      penny: 'legal',
      commander: 'legal',
      brawl: 'legal',
      duel: 'legal',
      oldschool: 'not_legal'
    },
    games: ['paper'],
    reserved: false,
    foil: false,
    nonfoil: true,
    oversized: false,
    promo: false,
    reprint: true,
    variation: false,
    set: 'ugl',
    set_name: 'Unglued',
    set_type: 'funny',
    set_uri: 'https://api.scryfall.com/sets/3404fc78-6678-4cf4-bd39-4c0be3bb7baf',
    set_search_uri: 'https://api.scryfall.com/cards/search?order=set&q=e%3Augl&unique=prints',
    scryfall_set_uri: 'https://scryfall.com/sets/ugl?utm_source=api',
    rulings_uri: 'https://api.scryfall.com/cards/8e3c2e1a-181e-4275-ad09-51c9de039d32/rulings',
    prints_search_uri:
      'https://api.scryfall.com/cards/search?order=released&q=oracleid%3Aa3fb7228-e76b-4e96-a40e-20b5fed75685&unique=prints',
    collector_number: '87',
    digital: false,
    rarity: 'common',
    card_back_id: '0aeebaf5-8c7d-4636-9e82-8c27447861f7',
    artist: 'Tom Wänerstrand',
    artist_ids: ['c4e0aa7c-a008-4d71-80ce-d5a1ca0b251b'],
    illustration_id: '3dac89df-a5ab-418f-9416-96bfd75f96bc',
    border_color: 'black',
    frame: '1997',
    full_art: true,
    textless: false,
    booster: true,
    story_spotlight: false,
    prices: {
      usd: '4.88',
      usd_foil: null,
      eur: '3.61',
      tix: null
    },
    related_uris: {
      gatherer: 'https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=9707',
      tcgplayer_decks:
        'https://decks.tcgplayer.com/magic/deck/search?contains=Mountain&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      edhrec: 'https://edhrec.com/route/?cc=Mountain',
      mtgtop8: 'https://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Mountain'
    },
    purchase_uris: {
      tcgplayer:
        'https://shop.tcgplayer.com/product/productsearch?id=888&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      cardmarket:
        'https://www.cardmarket.com/en/Magic/Products/Singles/Unglued/Mountain?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall',
      cardhoarder:
        'https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Mountain&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall'
    }
  },
  plains: {
    count: 1,
    object: 'card',
    id: 'cb382733-ff3d-43e2-9b1e-efa2f7c28173',
    oracle_id: 'bc71ebf6-2056-41f7-be35-b2e5c34afa99',
    multiverse_ids: [9680],
    tcgplayer_id: 893,
    name: 'Plains',
    lang: 'en',
    released_at: '1998-08-11',
    uri: 'https://api.scryfall.com/cards/cb382733-ff3d-43e2-9b1e-efa2f7c28173',
    scryfall_uri: 'https://scryfall.com/card/ugl/84/plains?utm_source=api',
    layout: 'normal',
    highres_image: true,
    image_uris: {
      small:
        'https://img.scryfall.com/cards/small/front/c/b/cb382733-ff3d-43e2-9b1e-efa2f7c28173.jpg?1562799157',
      normal:
        'https://img.scryfall.com/cards/normal/front/c/b/cb382733-ff3d-43e2-9b1e-efa2f7c28173.jpg?1562799157',
      large:
        'https://img.scryfall.com/cards/large/front/c/b/cb382733-ff3d-43e2-9b1e-efa2f7c28173.jpg?1562799157',
      png:
        'https://img.scryfall.com/cards/png/front/c/b/cb382733-ff3d-43e2-9b1e-efa2f7c28173.png?1562799157',
      art_crop:
        'https://img.scryfall.com/cards/art_crop/front/c/b/cb382733-ff3d-43e2-9b1e-efa2f7c28173.jpg?1562799157',
      border_crop:
        'https://img.scryfall.com/cards/border_crop/front/c/b/cb382733-ff3d-43e2-9b1e-efa2f7c28173.jpg?1562799157'
    },
    mana_cost: '',
    cmc: 0,
    type_line: 'Basic Land — Plains',
    oracle_text: '({T}: Add {W}.)',
    colors: [],
    color_identity: ['W'],
    legalities: {
      standard: 'legal',
      future: 'legal',
      historic: 'legal',
      pioneer: 'legal',
      modern: 'legal',
      legacy: 'legal',
      pauper: 'legal',
      vintage: 'legal',
      penny: 'legal',
      commander: 'legal',
      brawl: 'legal',
      duel: 'legal',
      oldschool: 'not_legal'
    },
    games: ['paper'],
    reserved: false,
    foil: false,
    nonfoil: true,
    oversized: false,
    promo: false,
    reprint: true,
    variation: false,
    set: 'ugl',
    set_name: 'Unglued',
    set_type: 'funny',
    set_uri: 'https://api.scryfall.com/sets/3404fc78-6678-4cf4-bd39-4c0be3bb7baf',
    set_search_uri: 'https://api.scryfall.com/cards/search?order=set&q=e%3Augl&unique=prints',
    scryfall_set_uri: 'https://scryfall.com/sets/ugl?utm_source=api',
    rulings_uri: 'https://api.scryfall.com/cards/cb382733-ff3d-43e2-9b1e-efa2f7c28173/rulings',
    prints_search_uri:
      'https://api.scryfall.com/cards/search?order=released&q=oracleid%3Abc71ebf6-2056-41f7-be35-b2e5c34afa99&unique=prints',
    collector_number: '84',
    digital: false,
    rarity: 'common',
    card_back_id: '0aeebaf5-8c7d-4636-9e82-8c27447861f7',
    artist: 'Christopher Rush',
    artist_ids: ['c96773f0-346c-4f7d-9271-2d98cc5d86e1'],
    illustration_id: '5e74b3dc-9ee0-41e3-8805-000759c0e9bf',
    border_color: 'black',
    frame: '1997',
    full_art: true,
    textless: false,
    booster: true,
    story_spotlight: false,
    prices: {
      usd: '3.38',
      usd_foil: null,
      eur: '2.40',
      tix: null
    },
    related_uris: {
      gatherer: 'https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=9680',
      tcgplayer_decks:
        'https://decks.tcgplayer.com/magic/deck/search?contains=Plains&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      edhrec: 'https://edhrec.com/route/?cc=Plains',
      mtgtop8: 'https://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Plains'
    },
    purchase_uris: {
      tcgplayer:
        'https://shop.tcgplayer.com/product/productsearch?id=893&partner=Scryfall&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall',
      cardmarket:
        'https://www.cardmarket.com/en/Magic/Products/Singles/Unglued/Plains?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall',
      cardhoarder:
        'https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Plains&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall'
    }
  }
}

export default function DeckBuilderView() {
  const classes = styles()
  const { deckID } = useParams()

  const [deckData, deckError, isLoading] = decksService.useGetUserDeck(deckID)
  const [editDeck, editResponse, editError, editIsLoading] = decksService.useEditDeck(deckID)

  const [mainBoard, setMainBoard] = useState([])
  const [sideboard, setSideboard] = useState([])
  const [showStats, setShowStats] = useState(false)
  const [cardToShow, setCardToShow] = useState(null)
  const [sbTransferTrigger, setSbTransferTrigger] = useState(0)
  const [dTransferTrigger, setDTransferTrigger] = useState(0)

  const [basicLandsOpen, setBasicLandsOpen] = useState(false)
  const [basicLandsAnchorEl, setBasicLandsAnchorEl] = useState(null)

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    setSideboard(deckData ? byCount(deckData.sideboard) : [])
    setMainBoard(deckData ? byCount(deckData.mainboard) : [])
  }, [deckData])

  useEffect(() => {
    if (editResponse) {
      setAlertOpen(true)
      setAlertSeverity('success')
      setAlertMessage(editResponse.message)
    } else if (editError) {
      setAlertOpen(true)
      setAlertSeverity('error')
      setAlertMessage(editError.message)
    }
  }, [editResponse, editError])

  const sbToDeck = useCallback(
    (cards) => {
      setMainBoard(incrementedMany(mainBoard, cards))
      setSideboard(decrementedMany(sideboard, cards))
    },
    [mainBoard, sideboard]
  )

  const deckToSb = useCallback(
    (cards) => {
      setMainBoard(decrementedMany(mainBoard, cards))
      setSideboard(incrementedMany(sideboard, cards))
    },
    [mainBoard, sideboard]
  )

  function handleDoneButtonClick(e) {
    e.preventDefault()

    editDeck({
      mainboard: mainBoard,
      sideboard: sideboard,
      api_id: deckData.api_id,
      name: deckData.name
    })
  }

  function handleAddLandButtonClick(e) {
    setMainBoard(incrementedMany(mainBoard, [basicLands[e.currentTarget.id]]))
  }

  function handleRemoveLandButtonClick(e) {
    setMainBoard(decrementedMany(mainBoard, [basicLands[e.currentTarget.id]]))
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  const handleCloseLands = (e) => {
    setBasicLandsOpen(false)
  }

  const handleOpenBasicLands = (e) => {
    setBasicLandsOpen(true)
    setBasicLandsAnchorEl(e.currentTarget)
  }

  if (isLoading) return <Loading />
  if (deckError) {
    console.log(deckError, deckError.response.status, deckError.headers)
    console.log(JSON.stringify(deckError))
  }

  return (
    <div>
      {editIsLoading && <Loading />}
      <AlertSnackbar
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleClose}
      />
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.statsfab}
        onClick={() => (showStats ? setShowStats(false) : setShowStats(true))}
      >
        <PieChartIcon />
      </Fab>
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.donefab}
        onClick={handleDoneButtonClick}
      >
        <DoneIcon />
      </Fab>
      <Fab
        size='large'
        color='primary'
        aria-label='add'
        className={classes.landsfab}
        onClick={handleOpenBasicLands}
      >
        <LandscapeIcon />
      </Fab>
      <Popover
        open={basicLandsOpen}
        onClose={handleCloseLands}
        anchorEl={basicLandsAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <AddBasicLandsBox
          handleAddButtonClick={handleAddLandButtonClick}
          handleRemoveButtonClick={handleRemoveLandButtonClick}
        />
      </Popover>
      <Box display='flex' justifyContent='center' p='10px'>
        <Paper className={classes.topPaper}>
          <Grid
            className={classes.contentsGrid}
            direction='row'
            spacing={2}
            container
            justify='flex-start'
            alignItems='flex-start'
          >
            <Grid item>
              <Typography variant='h6'>{`Sideboard (${count(sideboard)})`}</Typography>
              <DeckBuildeCardTable
                cards={sideboard}
                handleTransfer={sbToDeck}
                setImage={setCardToShow}
                transferTrigger={sbTransferTrigger}
              />
            </Grid>
            <Grid item>
              <Box justifyContent='center' display='grid' mt='100px'>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => setSbTransferTrigger(sbTransferTrigger + 1)}
                >
                  <ArrowForwardIosIcon />
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => setDTransferTrigger(dTransferTrigger + 1)}
                >
                  <ArrowBackIosIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant='h6'>{`Deck (${count(mainBoard)})`}</Typography>
              <DeckBuildeCardTable
                cards={mainBoard}
                handleTransfer={deckToSb}
                setImage={setCardToShow}
                transferTrigger={dTransferTrigger}
              />
            </Grid>
          </Grid>

          <Drawer anchor='top' open={showStats} onClose={() => setShowStats(false)}>
            <FullStatsBox cards={mainBoard} direction={'row'} />
          </Drawer>
        </Paper>
        <Box className={classes.cardImageBox} ml={5}>
          {<CardImage card={cardToShow} />}
        </Box>
      </Box>
    </div>
  )
}
