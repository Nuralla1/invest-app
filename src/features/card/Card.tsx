import React from "react";
import { useDispatch } from "react-redux";

import { fetchCompanyProfiles } from "../cards/cardsSlice";

const Card = ({ symbol, id }: any) => {
  const dispatch = useDispatch();

  const companyProfile = dispatch<any>(fetchCompanyProfiles(symbol));
  return (
    <>
      <div>{}</div>
    </>
  );
};

export default Card;
