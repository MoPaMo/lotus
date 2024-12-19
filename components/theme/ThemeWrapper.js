// ThemeWrapper.js
import React, { useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { ThemeContext } from "./ThemeContext";
import { themes } from "./themes";

const ThemeWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const selectedTheme = theme === "dark" ? themes.frappe : themes.latte;

  return (
    <StyledThemeProvider theme={selectedTheme}>{children}</StyledThemeProvider>
  );
};

export default ThemeWrapper;
