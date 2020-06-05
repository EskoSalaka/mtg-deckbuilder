import React from 'react'
import { Divider, makeStyles } from '@material-ui/core'
import CardTitle from './CardTitle'
import CardTypeLine from './CardTypeLine'
import CardOracleText from './CardOracleText'
import CardFlavorText from './CardFlavorText'
import CardPT from './CardPT'

const styles = makeStyles({
  divider: { marginTop: 5, marginBottom: 5 },
})

export default function CardFaceInfo({ cardFace, card }) {
  const classes = styles()
  return (
    <>
      <CardTitle cardName={cardFace.name} cardManaCost={cardFace.mana_cost} />
      <Divider className={classes.divider} />

      <CardTypeLine cardTypeLine={cardFace.type_line} card={card} />
      <Divider className={classes.divider} />

      {cardFace.oracle_text && <CardOracleText cardOracleText={cardFace.oracle_text} />}
      {cardFace.flavor_text && <CardFlavorText cardFlavorText={cardFace.flavor_text} />}

      {(cardFace.oracle_text || cardFace.flavor_text) && <Divider className={classes.divider} />}
      {cardFace.toughness && (
        <CardPT cardToughness={cardFace.toughness} cardPower={cardFace.power} />
      )}

      {cardFace.toughness && <Divider className={classes.divider} />}
    </>
  )
}

export * from './CardInfoBox'
