import Cards from "../../components/Cards/Cards";
import MainDescription from "../../components/MainDescription/MainDescription";
import { Box } from "@mui/material";

const MainPage = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(45deg, #03071e, #dc0202)",
        }}
      >
        <MainDescription />
        <Cards />
      </Box>
    </>
  );
};
export default MainPage;
