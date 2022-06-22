import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import store from "../../store";

import { useEffect } from "react";
import { fetchCompanyProfiles, fetchSymbols } from "./cardsSlice";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

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

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: "0%",
                  }}
                  image="https://source.unsplash.com/random"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Company name
                  </Typography>
                  <Typography>Additional company info</Typography>
                </CardContent>
                <CardActions>
                  <Button size="large">See more info</Button>
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
