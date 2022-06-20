import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import store from "../../store";

import { useEffect } from "react";
import {
  fetchCompanyProfiles,
  fetchSymbols,
  selectCompanyProfiles,
} from "./cardsSlice";
import { Card } from "@mui/material";

const Cards = () => {
  const dispatch = useDispatch();

  //   const symbolsArr = useSelector((state: any) => state.cards.symbols);
  const companyProfiles: any = useSelector(selectCompanyProfiles);
  store.dispatch(fetchSymbols());

  store.dispatch(fetchCompanyProfiles(store.getState().cards.symbols));
  // console.log(companyProfiles);
  // console.log(store.getState());

  // useEffect(() => {
  //   store.dispatch(fetchSymbols());
  // });

  return (
    <>
      <div>
        {companyProfiles.map((company: any) => {
          <span>{company.name}</span>;
        })}
      </div>
    </>
  );
};

export default Cards;
