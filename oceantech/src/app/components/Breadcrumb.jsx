import { Breadcrumbs, Hidden, Icon, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const BreadcrumbRoot = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const SubName = styled("span")(() => ({
  textTransform: "capitalize",
  color: "rgba(52, 49, 76, 0.54)",
}));

const StyledIcon = styled(Icon)(() => ({
  marginBottom: "4px",
  verticalAlign: "middle",
}));

const Breadcrumb = ({ routeSegments }) => {
  return (
    <BreadcrumbRoot>
      <Breadcrumbs
        separator={<Icon sx={{ color: "rgba(52, 49, 76, 0.38)" }}>navigate_next</Icon>}
        sx={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <NavLink to="/">
          <StyledIcon color="primary">home</StyledIcon>
        </NavLink>

        {routeSegments
          ? routeSegments.map((route, index) => {
              return index !== routeSegments.length - 1 ? (
                <SubName>{route.name}</SubName>
              ) : (
                <SubName key={index}>{route.name}</SubName>
              );
            })
          : null}
      </Breadcrumbs>
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
