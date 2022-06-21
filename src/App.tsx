import React from "react";
import "./App.css";
import Cards from "./features/cards/Cards";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./features/header/Header";
import MainDescription from "./features/MainDescription/MainDescription";
import Footer from "./features/footer/Footer";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <MainDescription />
        <Cards />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
