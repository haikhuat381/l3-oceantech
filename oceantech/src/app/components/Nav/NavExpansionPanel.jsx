import React from "react";
import { ButtonBase, Icon, Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
const NavExpandRoot = styled("div")(({ theme }) => ({
  "& .expandIcon": {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)",
  },
  "& .collapseIcon": {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)",
  },
  "& .expansion-panel": {
    overflow: "hidden",
    transition: "max-height 0.3s cubic-bezier(0, 0, 0.2, 1)",
  },
  "& .highlight": {
    // background: theme.palette.primary.main,
  },
  "&.compactNavItem": {
    width: 44,
    overflow: "hidden",
    justifyContent: "center !important",
    "& .itemText": { display: "none" },
    "& .itemIcon": { display: "none" },
  },
}));
const BaseButton = styled(ButtonBase)(({ sideNavTheme }) => ({
  height: 44,
  width: "100%",
  padding: "0 16px",
  whiteSpace: "pre",
  overflow: "hidden",
  // paddingRight: "16px",
  borderRadius: "4px",
  marginBottom: "8px",
  display: "flex",
  justifyContent: sideNavTheme === "full" ? "space-between !important" : "",
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "& .icon": {
    width: 36,

    fontSize: "18px",
    // paddingLeft: "16px",
    verticalAlign: "middle",
  },
}));

const ItemText = styled("span")(({ sideNavTheme }) => ({
  fontSize: "0.875rem",
  paddingLeft: "0.8rem",
  verticalAlign: "middle",
  lineHeight: 1.5,

  display: sideNavTheme === "full" ? "" : "none",
}));
function NavExpansionPanel({ item, children, sideNavTheme }) {
  const [collapsed, setCollapsed] = useState(true);
  const elementRef = useRef(null);
  const componentHeight = useRef(0);
  const { pathname } = useLocation();
  const { name, icon } = item;
  const handleClick = () => {
    componentHeight.current = 0;
    calcaulateHeight(elementRef.current);
    setCollapsed(!collapsed);
  };

  const calcaulateHeight = useCallback((node) => {
    if (node.name !== "child") {
      for (let child of node.children) {
        calcaulateHeight(child);
      }
    }

    if (node.name === "child") componentHeight.current += node.scrollHeight;
    else componentHeight.current += 44; //here 44 is node height
    return;
  }, []);
  useEffect(() => {
    if (!elementRef) return;

    calcaulateHeight(elementRef.current);

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    for (let child of elementRef.current.children) {
      if (child.getAttribute("href") === pathname) {
        setCollapsed(false);
      }
    }
  }, [pathname, calcaulateHeight]);

  return (
    <NavExpandRoot>
      <BaseButton
        sideNavTheme={sideNavTheme}
        className={clsx({
          "has-submenu compactNavItem": true,

          open: !collapsed,
        })}
        onClick={handleClick}
      >
        <Box>
          {icon && (
            <Icon color={sideNavTheme === "full" ? "" : "primary"} className="icon">
              {icon}
            </Icon>
          )}

          <ItemText sideNavTheme={sideNavTheme}>{name}</ItemText>
        </Box>

        <div
          className={clsx({
            sidenavHoverShow: true,
            collapseIcon: collapsed,
            expandIcon: !collapsed,
          })}
        >
          <Icon
            fontSize="small"
            sx={{ verticalAlign: "middle", display: sideNavTheme === "full" ? "" : "none" }}
          >
            chevron_right
          </Icon>
        </div>
      </BaseButton>
      <div
        ref={elementRef}
        className="expansion-panel submenu"
        style={collapsed ? { maxHeight: "0px" } : { maxHeight: componentHeight.current + "px" }}
      >
        {children}
      </div>
    </NavExpandRoot>
  );
}

export default NavExpansionPanel;
