import React, { useState } from "react"
import { makeStyles } from "@material-ui/styles"
import FlipButton from "./FlipButton"

const styles = makeStyles({
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: "4.75% / 3.5%"
  }
})

export default function CardImage({ card, turned }) {
  const classes = styles()

  const [isTurned, setTurned] = useState(turned)
  const [flipButtonVisible, setFlipButtonVisible] = useState(false)

  function onFlipButtonClicked(e) {
    e.preventDefault()
    setTurned(isTurned ? false : true)
  }

  function handleMouseEnter(e) {
    e.preventDefault()
    if (card.layout === "transform" || card.layout === "double_faced_token") {
      setFlipButtonVisible(true)
    }
  }

  function HandleMouseLeave(e) {
    e.preventDefault()
    if (flipButtonVisible) {
      setFlipButtonVisible(false)
    }
  }

  const frontFace =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].image_uris.normal
      : card.image_uris.normal

  const backFace =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[1].image_uris.normal
      : null

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={HandleMouseLeave}>
      <FlipButton onClickHandler={onFlipButtonClicked} isVisible={flipButtonVisible} />
      <img className={classes.cardImage} src={isTurned ? backFace : frontFace} alt={card.name} />
    </div>
  )
}
