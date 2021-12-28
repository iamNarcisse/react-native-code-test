import React, { useState } from "react";
import { AppTheme } from "./types";

export const ThemeContext = React.createContext({
  theme: AppTheme.LIGHT,
  toggleTheme: (theme = AppTheme.DARK) => {},
});

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(AppTheme.LIGHT);

  const toggleTheme = (theme = AppTheme.DARK) => {
    const nextTheme = theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
