import React from "react";
import { useState, useEffect, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import {
  fetchCompanyInfo,
  fetchChartInfo,
} from "../../features/cards/cardsSlice";

import LinearProgress from "@mui/material/LinearProgress";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chart from "react-apexcharts";

import { ChartConfig } from "../../types/types";

const chart: ChartConfig = {
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
  const dispatch = useAppDispatch();
  const { companySymbol } = useParams();
  const [period, setPeriod] = useState("5d");
  const [interval, setInterval] = useState("1d");

  const companyInfo = useAppSelector(
    (state) => state.cards.currentCompanyInfo,
    shallowEqual
  );
  const chartInfo = useAppSelector(
    (state) => state.cards.chartInfo,
    shallowEqual
  );

  const loadingStatus = useAppSelector((state) => state.cards.status);

  const changePeriodHandler = useCallback((range: string, interval: string) => {
    setPeriod(range);
    setInterval(interval);
  }, []);

  // useEffect(() => {
  //   dispatch(fetchCompanyInfo(companySymbol));
  // }, [companySymbol]);

  // useEffect(() => {
  //   dispatch(fetchChartInfo({ companySymbol, period, interval }));
  // }, [period]);

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
            alt={`${companyInfo.longName}`}
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
              chartInfo.prices ? [{ data: chartInfo.prices }] : [{ data: [] }]
            }
            type="candlestick"
            width="100%"
          />
          <Stack direction="row" spacing={2}>
            <Button onClick={() => changePeriodHandler("1d", "15m")}>1d</Button>
            <Button onClick={() => changePeriodHandler("5d", "1d")}>5d</Button>
            <Button onClick={() => changePeriodHandler("1mo", "1d")}>
              1mo
            </Button>
            <Button onClick={() => changePeriodHandler("6mo", "1wk")}>
              6mo
            </Button>
            <Button onClick={() => changePeriodHandler("1y", "1mo")}>1y</Button>
            <Button onClick={() => changePeriodHandler("10y", "1mo")}>
              10y
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
