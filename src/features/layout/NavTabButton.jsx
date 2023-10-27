import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { Tabs } from "antd";
import { TAB_MENU } from "../../Constants";

/**
 * Renders a sign-out button
 */

export const NavTabButton = ({ setTabMenu }) => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };
  return (
    <div
      style={{
        width: "40%",
        minWidth: "320px",
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Tabs
        defaultActiveKey="2"
        items={TAB_MENU.map((item, i) => {
          return {
            label: (
              <>
                {item.Icon}
                <span style={{ fontWeight: 500 }}>{item.value}</span>
              </>
            ),
            key: item.value,
            // children: `Tab ${id}`,
          };
        })}
        style={{
          width: "143px",
          marginRight: "40px",
        }}
        onChange={(key) => {
          setTabMenu(key);
        }}
      />
      <Button
        variant={"contained"}
        color={"info"}
        onClick={() => handleLogout("redirect")}
      >
        로그아웃
      </Button>
    </div>
  );
};
