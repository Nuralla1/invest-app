import React from "react";
import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanyInfo } from "../features/cards/cardsSlice";
import store from "../store";

import LinearProgress from "@mui/material/LinearProgress";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Chart from "react-apexcharts";

const chart: any = {
  options: {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  },
};

const Profile = () => {
  const { companySymbol } = useParams();
  const [series, setSeries] = useState([{ data: [] }]);

  const companyInfo = useSelector(
    (state: any) => state.cards.currentCompanyInfo,
    shallowEqual
  );

  const loadingStatus = useSelector((state: any) => state.cards.status);

  const { prices } = companyInfo;
  const pricesFormatted = prices.map((obj: any) => ({
    x: new Date(obj.x),
    y: obj.y,
  }));

  useEffect(() => {
    store.dispatch(fetchCompanyInfo(companySymbol));
    setSeries([{ data: pricesFormatted }]);
  }, []);

  if (loadingStatus === "loading") {
    return (
      <>
        <Box
          sx={{
            pt: 20,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LinearProgress />
        </Box>
      </>
    );
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
          <Chart
            options={chart.options}
            series={series}
            type="candlestick"
            width="100%"
          />
        </Box>
      </Container>
    </>
  );
};

export default Profile;
