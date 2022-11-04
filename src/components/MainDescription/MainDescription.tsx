import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const MainDescription = () => {
  return (
    <Box
      sx={{
        bgcolor: "#03071e7a",
        pt: 8,
        pb: 6,
        m: 6,
        borderRadius: 6,
        boxShadow: "0.5px 0.5px 25px 2px  white",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="white"
          gutterBottom
        >
          SUNRISE INVEST
        </Typography>
        <img
          alt="Jusan logo"
          width="400px"
          src="https://cdn-scripbox-wordpress.scripbox.com/wp-content/uploads/2018/02/coffee-can-investing-vector.png"
        />
        <Typography variant="h5" align="center" color="white" paragraph>
          Here is my shiny invest app. Give me your money and I will make you
          rich. There is a list of companies that you can invest in. Click on
          the cards to get more info.
        </Typography>
      </Container>
    </Box>
  );
};
export default MainDescription;
