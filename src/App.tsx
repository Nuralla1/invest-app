import React from "react";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/mainPage/mainPage";
import Profile from "./components/Proifle/Profile";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import { UserProvider } from "./UserContext";

const theme = createTheme();

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <Box>
            {location.pathname !== "/signIn" &&
              location.pathname !== "/signUp" && <Header />}
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/:companySymbol" element={<Profile />} />
            </Routes>
            {location.pathname !== "/signIn" &&
              location.pathname !== "/signUp" && <Footer />}
          </Box>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
