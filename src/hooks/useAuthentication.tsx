import { AuthenticatedUserContext } from "@src/navigation/AuthenticatedProvider";
import React from "react";

const useAppAuthentication = () => {
  const authenticatedContext = React.useContext(AuthenticatedUserContext);
  function setUser<T>(user: T) {
    authenticatedContext.setUser(user);
  }

  return {
    user: authenticatedContext.user,
    setUser,
  };
};

export { useAppAuthentication };
