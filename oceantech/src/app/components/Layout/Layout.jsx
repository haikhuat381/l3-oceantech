import React, { useState } from "react";

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LayoutSidenav from "./LayoutSidenav";
import LayoutTopbar from "./LayoutTopbar";
import MatxSuspense from "../MatxSuspense";
const LayoutRoot = styled(Box)(() => ({
  display: "flex",
}));
import Footer from "../Footer/Footer";
const LayoutContainer = styled(Box)(({ sideNavTheme }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: sideNavTheme === "full" ? 260 : 80,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
}));
const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
}));
function Layout(props) {
  const [sideNavTheme, setsideNavTheme] = useState("full");
  const handleChangeSideNavTheme = () => {
    setsideNavTheme(
      "full" === sideNavTheme ? "compact" : "full"
      // ...sideNavTheme,
      // width: sideNavTheme.width === 80 ? 260 : 80,
      // sizeImage: sideNavTheme.sizeImage === "160px" ? "240px" : "160px",
      // displayText: sideNavTheme.displayText === "none" ? "" : "none",
    );
  };
  return (
    <>
      <LayoutRoot>
        <LayoutSidenav sideNavTheme={sideNavTheme} />
        <LayoutContainer sideNavTheme={sideNavTheme}>
          <LayoutTopbar handleChangeSideNavTheme={handleChangeSideNavTheme} />
          <ContentBox>
            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>
            <Footer />
          </ContentBox>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default Layout;
