import Cards from "../cards/Cards";
import MainDescription from "../MainDescription/MainDescription";
import { Box } from "@mui/material";

const MainPage = () => {
  return (
    <>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <MainDescription />
        <Cards />
      </Box>
    </>
  );
};
export default MainPage;
