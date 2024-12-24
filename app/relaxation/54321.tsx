import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const steps = [
  { count: 5, icon: "eye", label: "See 5 things" },
  { count: 5, icon: "ear", label: "Hear 5 things" },
  { count: 5, icon: "flower", label: "Smell 5 things" },
  { count: 4, icon: "eye", label: "See 4 things" },
  { count: 4, icon: "ear", label: "Hear 4 things" },
  { count: 4, icon: "flower", label: "Smell 4 things" },
  { count: 3, icon: "eye", label: "See 3 things" },
  { count: 3, icon: "ear", label: "Hear 3 things" },
  { count: 3, icon: "flower", label: "Smell 3 things" },
  { count: 2, icon: "eye", label: "See 2 things" },
  { count: 2, icon: "ear", label: "Hear 2 things" },
  { count: 2, icon: "flower", label: "Smell 2 things" },
  { count: 1, icon: "eye", label: "See 1 thing" },
  { count: 1, icon: "ear", label: "Hear 1 thing" },
  { count: 1, icon: "flower", label: "Smell 1 thing" },
];

const FiveFiveFourFourThreeThreeTwoTwoOneOneOne = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnim = useState(new Animated.Value(-100))[0];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        slideAnim.setValue(-100);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <FontAwesome name={steps[currentStep].icon} size={50} color="red" />
        <Text style={styles.text}>{steps[currentStep].label}</Text>
      </Animated.View>
      <Button title="Continue" onPress={nextStep} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginVertical: 20,
    color: "red",
  },
});

export default FiveFiveFourFourThreeThreeTwoTwoOneOneOne;
