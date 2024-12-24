// _layout.tsx
import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import { Stack } from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_900Black } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

const Layout = () => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_900Black,
        Poppins_600SemiBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ThemeProvider>
            <ThemeWrapper>
                <Stack screenOptions={{ headerShown: false }} />
            </ThemeWrapper>
        </ThemeProvider>
    );
};

export default Layout;
