// _layout.tsx
import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Stack />
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default Layout;
