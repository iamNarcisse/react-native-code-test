import { ThemeContext } from "@src/context";
import React from "react";

const useAppTheme = () => {
  const themeContext = React.useContext(ThemeContext);
  const toggleTheme = () => {
    themeContext.toggleTheme(themeContext.theme);
  };

  return {
    theme: themeContext.theme,
    toggleTheme,
  };
};

export { useAppTheme };
