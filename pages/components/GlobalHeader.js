import React, { useContext } from "react";
import { Header, ResponsiveContext } from "grommet";
import { AppIdentity } from "./AppIdentity";
import { HeaderNav } from "./HeaderNav";
import { UserContext } from "./UserContext";

export const GlobalHeader = () => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  return (
    <Header
      align="center"
      background="background"
      border={user ? { color: "border-weak", side: "bottom" } : undefined}
      justify="between"
      fill="horizontal"
      pad={{
        horizontal: !["xsmall", "small"].includes(size) ? "medium" : "small",
        vertical: "small",
      }}
    >
      <AppIdentity title="Passport" brand="purpledoc" />
      {user && <HeaderNav />}
    </Header>
  );
};
