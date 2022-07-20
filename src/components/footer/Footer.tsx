import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(171deg, #03071e, #dc0202)",
        p: 6,
        mt: "auto",
        color: "white",
      }}
      component="footer"
    >
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item sm={4}>
            <Box borderBottom={1}>Info</Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                About
              </Link>
            </Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                News
              </Link>
            </Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                Contacts
              </Link>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box borderBottom={1}>Social Media</Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                <InstagramIcon />
              </Link>
            </Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                <FacebookIcon />
              </Link>
            </Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                <TwitterIcon />
              </Link>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                Open account
              </Link>
            </Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                F.A.Q.
              </Link>
            </Box>
            <Box>
              <Link href="https://www.jusaninvest.kz/" color="inherit">
                Careers
              </Link>
            </Box>
          </Grid>
        </Grid>
        <img
          alt="Jusan logo"
          width="100px"
          src="https://www.jusaninvest.kz/assets/img/index/trading.svg"
        />
        <Typography
          variant="subtitle1"
          align="center"
          color="inherit"
          component="p"
        >
          <Link href="https://www.jusaninvest.kz/" color="inherit">
            Jusan Invest!
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
