"use client";

import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import KeycloakWrapper from "./KeycloakWrapper";
import Navigation from "./Navigation";
import { useState } from "react";

export default function ClientAuthLayout({ children }) {
  return (
    <KeycloakWrapper>
      <AuthContent>{children}</AuthContent>
    </KeycloakWrapper>
  );
}

function AuthContent({ children }) {
  const { keycloak, initialized } = useKeycloak();
  const [searchQuery, setSearchQuery] = useState("");

  // if (!initialized) return <p>Loading Keycloak...</p>;

  return keycloak.authenticated ? (
    <div className="flex w-full h-max justify-center align-middle flex-col">
      <Navigation setSearchQuery={setSearchQuery} />
      {children &&
        typeof children === "object" &&
        "type" in children &&
        React.cloneElement(children, { searchQuery })}
    </div>
  ) : (
      <div className={"flex w-full h-max"}>
        <div
            className={
              "flex w-full h-max m-20 justify-center align-middle space-between"
            }
        >
          <div className={"text-8xl font-bold mt-10 w-full justify-center"}>
            You are not logged in
          </div>
          <div className={"flex flex-col"}>
            <button
                className={"bg-blue-800 h-20 w-48 rounded-2xl text-2xl"}
                onClick={() => keycloak.login()}
            >
              Log In
            </button>
            <div
                className={
                  "text-gray-300 h-5 m-3 rounded-2xl text-2xl self-center"
                }
            >
              OR
            </div>
            <button
                className={"h-15 w-48 rounded-2xl text-2xl"}
                onClick={()=> keycloak.register()}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
  );
}