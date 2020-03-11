import React from "react"
import { Divider } from "@material-ui/core"
import CardTitle from "./CardTitle"
import CardTypeLine from "./CardTypeLine"
import CardOracleText from "./CardOracleText"
import CardFlavorText from "./CardFlavorText"
import CardPT from "./CardPT"

export default function CardFaceInfo({ cardFace, card }) {
  return (
    <>
      <CardTitle cardName={cardFace.name} cardManaCost={cardFace.mana_cost} />
      <Divider />

      <CardTypeLine cardTypeLine={cardFace.type_line} card={card} />
      <Divider />

      {cardFace.oracle_text && <CardOracleText cardOracleText={cardFace.oracle_text} />}
      {cardFace.flavor_text && <CardFlavorText cardFlavorText={cardFace.flavor_text} />}

      {(cardFace.oracle_text || cardFace.flavor_text) && <Divider />}
      {cardFace.toughness && (
        <CardPT cardToughness={cardFace.toughness} cardPower={cardFace.power} />
      )}

      {cardFace.toughness && <Divider />}
    </>
  )
}

export * from "./CardInfoBox"
