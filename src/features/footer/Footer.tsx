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
    <Box sx={{ bgcolor: "#background.paper", p: 6 }} component="footer">
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item sm={4}>
            <Box borderBottom={1}>Info</Box>
            <Box>
              <Link href="/" color="inherit">
                About
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                News
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Contacts
              </Link>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box borderBottom={1}>Social Media</Box>
            <Box>
              <Link href="/" color="inherit">
                <InstagramIcon />
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                <FacebookIcon />
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                <TwitterIcon />
              </Link>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href="/" color="inherit">
                Open account
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                F.A.Q.
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Careers
              </Link>
            </Box>
          </Grid>
        </Grid>
        <img
          alt="Jusan logo"
          width="150px"
          src="data:image/png;base64,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"
        />
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
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
