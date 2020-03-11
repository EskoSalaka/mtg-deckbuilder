import React, { useState, useEffect } from "react";
import FullCardInfo from "./FullCardInfo";

import cardService from "../../services/cards";

export default function CardInfoView({ match }) {
  console.log("====================================");
  console.log("Card");
  console.log(match);
  console.log("====================================");

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCard = async () => {
    let response = await cardService.getBySet(
      match.params.code,
      match.params.collector_number
    );
    console.log("====================================");
    console.log(response);
    console.log("====================================");

    setCard(response.data);
    setLoading(false);
    console.log("====================================");
    console.log(card);
    console.log("====================================");
  };

  useEffect(() => {
    console.log("====================================");
    console.log("card mounting");
    console.log("====================================");
    fetchCard();
  }, []);

  return !loading && <FullCardInfo card={card} />;
}
