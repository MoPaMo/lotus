// _layout.tsx
import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import { Stack, useRouter, usePathname } from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_900Black } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Layout = () => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_900Black,
        Poppins_600SemiBold
    });

    const router = useRouter();
    const pathname = usePathname();

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ThemeProvider>
            <ThemeWrapper>
                {pathname !== "/" && (
                    <TouchableOpacity
                        onPress={() => router.push("/")}
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#fff",
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2,
                            zIndex: 100
                        }}
                    >
                        <FontAwesome6 name="house" size={24} color="black" />
                    </TouchableOpacity>
                )}
                <Stack screenOptions={{ headerShown: false }} />
            </ThemeWrapper>
        </ThemeProvider>
    );
};

export default Layout;
