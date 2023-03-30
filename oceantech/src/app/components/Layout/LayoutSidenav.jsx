import React from "react";
import { Box, margin, styled } from "@mui/system";
import Brand from "../Nav/Brand";
import Sidenav from "../Nav/Sidenav";
import { navigations } from "../../navigations";
const NavListBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const SidebarNavRoot = styled(Box)(({ sideNavTheme }) => ({
  position: "fixed",
  height: "100vh",
  width: sideNavTheme === "full" ? 260 : 80,

  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "cover",
  zIndex: 111,
  overflow: "hidden",
  color: "#FFFFFF",
  transition: "all 300ms ease",
  background:
    "linear-gradient(to bottom, rgba(34,42,69, 0.96), rgba(34,42,69, 0.96)),url(/assets/images/sidebar/sidebar-bg-dark.jpg)",
}));
function LayoutSidenav(props) {
  const { sideNavTheme } = props;
  return (
    <>
      <SidebarNavRoot sideNavTheme={sideNavTheme}>
        <NavListBox>
          <Brand sideNavTheme={sideNavTheme}></Brand>
          <Sidenav sideNavTheme={sideNavTheme} items={navigations}></Sidenav>
        </NavListBox>
      </SidebarNavRoot>
    </>
  );
}

export default LayoutSidenav;
