/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useState, createContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { NavTabButton } from "./NavTabButton";

export const TabContext = createContext();

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  const [tabMenu, setTabMenu] = useState("Team");

  return (
    <>
      <TabContext.Provider value={tabMenu}>
        {isAuthenticated ? (
          <>
            <Navbar
              bg="white"
              variant="dark"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "-10px",
              }}
            >
              <a
                className="navbar-brand"
                href="/"
                style={{ color: "black", fontWeight: 600 }}
              >
                BIM Teams 관리
              </a>
              <NavTabButton setTabMenu={setTabMenu} />
            </Navbar>
            <hr />
          </>
        ) : (
          <></>
        )}
        {props.children}
      </TabContext.Provider>
    </>
  );
};
