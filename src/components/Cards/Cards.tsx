import React, { useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useEffect } from "react";
import { fetchCompanies } from "../../features/cards/cardsSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

import { Card, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";

import { CompanyWithImg, StoreState } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

const Cards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchedCompanies, setSearchedCompanies] = useState([]);

  const companiesArr = useAppSelector(
    (state: StoreState) => state.cards.entities,
    shallowEqual
  );

  const loadingStatus = useAppSelector(
    (state: StoreState) => state.cards.status
  );

  const searchHandler = (e: any) => {
    e.preventDefault();
    const searchValue = e.target[0].value;
    const filteredCompanies = companiesArr.filter(
      (company: CompanyWithImg) =>
        company.shortName?.toLowerCase().includes(`${searchValue}`) ||
        company.shortName?.includes(`${searchValue}`)
    );
    setSearchedCompanies(filteredCompanies);
    e.target[0].value = "";
  };

  // const renderFilteredCompanies = () => {
  //   {
  //     searchedCompanies.map((company: any) => (

  //         <Grid item key={company.symbol} xs={12} sm={6} md={4}>
  //           <Card
  //             sx={{
  //               height: "100%",
  //               display: "flex",
  //               flexDirection: "column",
  //               bgcolor: "#ef0b0054",
  //               color: "white",
  //               borderRadius: 6,
  //               boxShadow: "0.5px 0.5px 25px 2px  white",
  //             }}
  //           >
  //             <CardContent sx={{ flexGrow: 1 }}>
  //               <CardMedia
  //                 component="img"
  //                 sx={{
  //                   pt: "0%",
  //                 }}
  //                 image={company.img}
  //                 alt={`${company.shortName} IMAGE`}
  //               />
  //             </CardContent>
  //             <CardContent>
  //               <Typography gutterBottom variant="h5" component="h2">
  //                 {company.shortName}
  //               </Typography>
  //               <Typography>
  //                 Price: {`${company.regularMarketPrice}`} USD
  //               </Typography>
  //             </CardContent>
  //             <CardActions>
  //               <Button
  //                 size="large"
  //                 variant="text"
  //                 color="inherit"
  //                 onClick={() => navigate(`/${company.symbol}`)}
  //               >
  //                 See more info
  //               </Button>
  //             </CardActions>
  //           </Card>
  //         </Grid>

  //     ));
  //   }
  // };

  useEffect(() => {
    dispatch(fetchCompanies());
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
        <Box
          component="form"
          onSubmit={searchHandler}
          sx={{
            display: "flex",
            p: 2,
            mx: 6,
            mb: 4,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0.5px 0.5px 25px 2px  white",
            borderRadius: 6,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            placeholder="Поиск..."
            color="error"
            inputProps={{
              style: {
                color: "white",
              },
            }}
          />
          <IconButton sx={{ px: 1, alignSelf: "center" }} type="submit">
            <SearchIcon htmlColor="white" />
          </IconButton>
        </Box>

        <Grid container spacing={4}>
          {searchedCompanies.length < 1
            ? companiesArr.map((company: CompanyWithImg) => (
                <Grid item key={company.symbol} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "#ef0b0054",
                      color: "white",
                      borderRadius: 6,
                      boxShadow: "0.5px 0.5px 25px 2px  white",
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
                        variant="text"
                        color="inherit"
                        onClick={() => navigate(`/${company.symbol}`)}
                      >
                        See more info
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : searchedCompanies.map((company: any) => (
                <Grid item key={company.symbol} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "#ef0b0054",
                      color: "white",
                      borderRadius: 6,
                      boxShadow: "0.5px 0.5px 25px 2px  white",
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
                        variant="text"
                        color="inherit"
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
