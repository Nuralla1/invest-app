import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

const Profile = () => {
  const { companyNumber } = useParams();
  const companiesArr = useSelector(
    (state: any) => state.cards.entities,
    shallowEqual
  );

  const companyProfile = companiesArr.find(
    (company: any) => company.ticker === companyNumber
  );
  console.log(companyProfile);

  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography component="h4" variant="h3">
            {companyProfile.name}
          </Typography>
          <img
            alt={`${companyProfile.name} IMAGE`}
            src={companyProfile.img}
            width="200px"
          />
        </Box>
      </Container>
    </>
  );
};

export default Profile;
