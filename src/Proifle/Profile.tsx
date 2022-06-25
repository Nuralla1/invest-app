import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

const Profile = () => {
  const { companyNumber } = useParams();
  const companiesArr = useSelector(
    (state: any) => state.cards.entities,
    shallowEqual
  );
  console.log(companyNumber);
  console.log(companiesArr);
  const companyProfile = companiesArr.find(
    (company: any) => company.ticker === companyNumber
  );
  console.log(companyProfile);

  return (
    <>
      <Box>
        {companyProfile.name}
        <img alt={`${companyProfile.name} IMAGE`} src={companyProfile.img} />
      </Box>
    </>
  );
};

export default Profile;
