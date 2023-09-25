import React from "react";

export const CurrentUserContext = React.createContext<{
  user: CurrentUser;
  actions: { setUser: (user: CurrentUser) => void };
}>(undefined);
