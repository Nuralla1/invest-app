import React from "react";
import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanyInfo } from "../features/cards/cardsSlice";
import store from "../store";

import LinearProgress from "@mui/material/LinearProgress";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

const Profile = () => {
  const { companySymbol } = useParams();

  const companyInfo = useSelector(
    (state: any) => state.cards.currentCompanyInfo,
    shallowEqual
  );
  console.log(companyInfo);
  const loadingStatus = useSelector((state: any) => state.cards.status);
  const companiesArr = useSelector(
    (state: any) => state.cards.entities,
    shallowEqual
  );
  //   const generalCompanyInfo = companiesArr.find(
  //     (company: any) => companySymbol === company.symbol
  //   );

  useEffect(() => {
    setTimeout(() => store.dispatch(fetchCompanyInfo(companySymbol)), 0);
  }, []);
  if (loadingStatus === "loading") {
    return <LinearProgress />;
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box sx={{ p: 2 }}>
          <Typography component="h4" variant="h3">
            {companyInfo.longName}
          </Typography>
          <img
            alt={`${companyInfo.longName} IMAGE`}
            src={companyInfo.img}
            width="200px"
          />
          <Typography variant="subtitle1">
            {companyInfo.longBusinessSummary}
          </Typography>
          <Typography variant="overline">{companyInfo.website}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
