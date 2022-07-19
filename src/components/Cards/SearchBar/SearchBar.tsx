import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "100%",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "200px",
//       "&:focus": {
//         width: "200px",
//       },
//     },
//   },
// }));

const SearchBar = () => {
  return (
    <Box
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
      <IconButton sx={{ px: 1, alignSelf: "center" }}>
        <SearchIcon htmlColor="white" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
