import React from "react";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/mainPage/mainPage";
import Profile from "./components/Proifle/Profile";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:companySymbol" element={<Profile />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
