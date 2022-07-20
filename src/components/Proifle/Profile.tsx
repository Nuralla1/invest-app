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
import { Box, Container, Link } from "@mui/material";
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
      style: {
        color: "white",
        fontSize: "16px",
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        show: true,
        style: {
          colors: "#fff",
          fontSize: "16px",
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        show: true,
        style: {
          colors: "white",
          fontSize: "16px",
        },
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

  useEffect(() => {
    dispatch(fetchCompanyInfo(companySymbol));
  }, [companySymbol]);

  useEffect(() => {
    dispatch(fetchChartInfo({ companySymbol, period, interval }));
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
            background: "linear-gradient(26deg, #03071e, #dc0202)",
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
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: "100%",
          background: "linear-gradient(26deg, #03071e, #dc0202)",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography component="h4" variant="h3" color="white">
            {companyInfo.longName}
          </Typography>
          <img
            alt={`${companyInfo.longName}`}
            src={companyInfo.img}
            width="200px"
          />
          <Typography variant="subtitle1" color="white" align="justify">
            {companyInfo.longBusinessSummary}
          </Typography>
          <Link variant="overline" href={companyInfo.website}>
            {companyInfo.website}
          </Link>
          <Chart
            options={chart.options}
            series={
              chartInfo.prices ? [{ data: chartInfo.prices }] : [{ data: [] }]
            }
            type="candlestick"
            width="100%"
            height="600px"
          />
          <Stack direction="row" spacing={2}>
            <Button
              sx={{ color: "white" }}
              onClick={() => changePeriodHandler("1d", "15m")}
            >
              1d
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => changePeriodHandler("5d", "1d")}
            >
              5d
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => changePeriodHandler("1mo", "1d")}
            >
              1mo
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => changePeriodHandler("6mo", "1wk")}
            >
              6mo
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => changePeriodHandler("1y", "1mo")}
            >
              1y
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => changePeriodHandler("10y", "1mo")}
            >
              10y
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
