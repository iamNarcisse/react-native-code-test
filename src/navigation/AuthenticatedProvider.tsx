import React, { useState, createContext } from "react";

export const AuthenticatedUserContext = createContext({
  user: null,
  setUser: (user: any) => {},
});

export const AuthenticatedUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
