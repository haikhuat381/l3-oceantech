import React from "react";
import { Box, styled, Button } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Span } from "../Typography";
const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 auto",
}));
const StyledSpan = styled(Span)(({}) => ({
  fontSize: "18px",
  marginLeft: ".5rem",
  lineHeight: "1.5",
  display: "none",
}));
const Logo = styled("img")(({ sideNavTheme }) => ({
  backgroundSize: "contain",
  margin: "16px 10px 20px 8px",
  width: sideNavTheme === "full" ? "200px" : "160px",
}));

function Brand(props) {
  const { sideNavTheme } = props;
  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <Logo sideNavTheme={sideNavTheme} src="/assets/images/logos/osd-logo-white.png" alt="" />
        <StyledSpan>Oceantech</StyledSpan>
      </Box>
    </BrandRoot>
  );
}

export default Brand;
