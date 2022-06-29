import React from "react";
import { useState, useEffect, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanyInfo, fetchChartInfo } from "../features/cards/cardsSlice";
import store from "../store";

import LinearProgress from "@mui/material/LinearProgress";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
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
  const [period, setPeriod] = useState("5d");

  const companyInfo = useSelector(
    (state: any) => state.cards.currentCompanyInfo,
    shallowEqual
  );
  const chartInfo = useSelector(
    (state: any) => state.cards.chartInfo,
    shallowEqual
  );

  const loadingStatus = useSelector((state: any) => state.cards.status);

  console.log(chartInfo);

  const changePeriodHandler = useCallback((range: any) => {
    setPeriod(range);
  }, []);

  const requestData = { companySymbol, period };
  useEffect(() => {
    store.dispatch(fetchCompanyInfo(companySymbol));
  }, []);

  useEffect(() => {
    store.dispatch(fetchChartInfo(requestData));
  }, [period]);

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
            series={
              chartInfo.prices !== "undefined"
                ? [{ data: chartInfo.prices }]
                : [
                    {
                      data: [
                        { x: 1654003800, y: [0.99, 1, 0.94, 0.95] },
                        { x: 1654003800, y: [0.99, 1, 0.94, 0.95] },
                      ],
                    },
                  ]
            }
            type="candlestick"
            width="100%"
          />
          <Stack direction="row" spacing={2}>
            <Button onClick={() => changePeriodHandler("5d")}>5d</Button>
            <Button onClick={() => changePeriodHandler("1mo")}>1mo</Button>
            <Button onClick={() => changePeriodHandler("6mo")}>6mo</Button>
            <Button onClick={() => changePeriodHandler("1y")}>1y</Button>
            <Button onClick={() => changePeriodHandler("10y")}>10y</Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
