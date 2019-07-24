import React from "react"
import { Divider } from "@material-ui/core"
import CardTitleBox from "./CardTitleBox"
import CardTypeBox from "./CardTypeBox"
import CardOracleTextBox from "./CardOracleTextBox"
import CardFlavorTextBox from "./CardFlavorTextBox"
import CardPTBox from "./CardPTBox"

export default function CardFaceInfo({ cardFace }) {
  return (
    <>
      <CardTitleBox cardName={cardFace.name} cardManaCost={cardFace.mana_cost} />
      <Divider />

      <CardTypeBox cardTypeLine={cardFace.type_line} />
      <Divider />

      {cardFace.oracle_text && <CardOracleTextBox cardOracleText={cardFace.oracle_text} />}
      {cardFace.flavor_text && <CardFlavorTextBox cardFlavorText={cardFace.flavor_text} />}

      {(cardFace.oracle_text || cardFace.flavor_text) && <Divider />}
      {cardFace.toughness && (
        <CardPTBox cardToughness={cardFace.toughness} cardPower={cardFace.power} />
      )}
      {cardFace.toughness && <Divider />}
    </>
  )
}

export * from "./CardInfoBox"
