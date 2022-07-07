import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ p: 2, background: "linear-gradient(174deg, #03071e, #dc0202)" }}
      >
        <Toolbar
          sx={{
            disaply: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{}}>
            <img
              alt="Jusan logo"
              width="50px"
              src="https://www.jusaninvest.kz/assets/img/index/trading.svg"
            />

            <Button
              color="inherit"
              variant="outlined"
              size="large"
              sx={{ mx: 2, float: "right" }}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </Box>

          <Box>
            <Button
              color="inherit"
              variant="outlined"
              size="large"
              sx={{ mx: 1 }}
              onClick={() => navigate("/")}
            >
              Sign in
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              size="large"
              sx={{ mx: 1 }}
              onClick={() => navigate("/")}
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
