import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import store from "../../store";

import { useEffect } from "react";
import { fetchCompanies } from "./cardsSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

import { Box, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";

const Cards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companiesArr = useSelector(
    (state: any) => state.cards.entities,
    shallowEqual
  );

  const loadingStatus = useSelector((state: any) => state.cards.status);

  useEffect(() => {
    store.dispatch(fetchCompanies());
  }, []);
  if (loadingStatus === "loading") {
    return <LinearProgress />;
  }

  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
        maxWidth="md"
      >
        <AppBar position="relative">
          <SearchBar />
        </AppBar>
        <Grid container spacing={4}>
          {companiesArr.map((company: any) => (
            <Grid item key={company.symbol} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      pt: "0%",
                    }}
                    image={company.img}
                    alt={`${company.shortName} IMAGE`}
                  />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {company.shortName}
                  </Typography>
                  <Typography>
                    Price: {`${company.regularMarketPrice}`} USD
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    onClick={() => navigate(`/${company.symbol}`)}
                  >
                    See more info
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Cards;
