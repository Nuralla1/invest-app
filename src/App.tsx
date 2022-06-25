import React from "react";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";
import MainPage from "./features/mainPage/mainPage";
import Profile from "./Proifle/Profile";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:companyNumber" element={<Profile />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
