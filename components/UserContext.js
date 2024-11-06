import React from "react";

export const UserContext = React.createContext({
  user: {},
  setUser: () => {},
});

export const defaultUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};
