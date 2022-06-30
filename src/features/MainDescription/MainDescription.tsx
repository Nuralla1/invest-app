import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const MainDescription = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          INVEST APP
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Here is my shiny invest app. Give me your money and I will make you
          rich. There is a list of companies that you can invest in. Click on
          the cards to get more info.
        </Typography>
      </Container>
    </Box>
  );
};
export default MainDescription;
