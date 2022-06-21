import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import store from "../../store";

import { useEffect } from "react";
import { fetchCompanyProfiles, fetchSymbols } from "./cardsSlice";
import { Card } from "@mui/material";

const Cards = () => {
  // const [symbolsFetched, setSymbolsFetched] = useState(false);
  const dispatch = useDispatch();

  const symbolsArr = useSelector(
    (state: any) => state.cards.symbols,
    shallowEqual
  );
  const companyProfiles = useSelector(
    (state: any) => state.cards.entities,
    shallowEqual
  );

  console.log(companyProfiles);
  // useEffect(() => {
  //   setTimeout(() => store.dispatch(fetchSymbols()), 0);
  //   // setSymbolsFetched(true);
  // }, []);
  // useEffect(() => {
  //   setTimeout(() => store.dispatch(fetchCompanyProfiles(symbolsArr)), 0);
  // }, [symbolsArr]);

  return (
    <>
      <div>
        {companyProfiles.map((company: any) => {
          return <div key={company.ticker}>{company.country}</div>;
        })}
      </div>
    </>
  );
};

export default Cards;
