// Greeting.js
import React, { useContext } from "react";
import { PageHeader } from "grommet";
import { UserContext } from "./UserContext";

export const Greeting = () => {
  const { user } = useContext(UserContext);
  return (
    <PageHeader
      title={`Hey there!`}
      subtitle={
        "Welcome to the Purpledoc Passport. We provide a platform to allow all humans access essential services to meet their needs."
      }
    />
  );
};
