import React, { useState } from "react";
import { View, Text, Button, Animated } from "react-native";
import styled from "styled-components/native";
import { FontAwesome6 } from "@expo/vector-icons";

const steps = [
  { count: 5, icon: "eye", label: "See 5 things" },
  { count: 5, icon: "ear-listen", label: "Hear 5 things" },
  { count: 5, icon: "wind", label: "Smell 5 things" },
  { count: 4, icon: "eye", label: "See 4 things" },
  { count: 4, icon: "ear-listen", label: "Hear 4 things" },
  { count: 4, icon: "wind", label: "Smell 4 things" },
  { count: 3, icon: "eye", label: "See 3 things" },
  { count: 3, icon: "ear-listen", label: "Hear 3 things" },
  { count: 3, icon: "wind", label: "Smell 3 things" },
  { count: 2, icon: "eye", label: "See 2 things" },
  { count: 2, icon: "ear-listen", label: "Hear 2 things" },
  { count: 2, icon: "wind", label: "Smell 2 things" },
  { count: 1, icon: "eye", label: "See 1 thing" },
  { count: 1, icon: "ear-listen", label: "Hear 1 thing" },
  { count: 1, icon: "wind", label: "Smell 1 thing" },
];

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
  padding: 20px;
`;

const AnimatedStep = styled(Animated.View)`
  align-items: center;
  margin-bottom: 30px;
`;

const Icon = styled(FontAwesome6)`
  color: ${(props) => props.theme.red};
  margin-bottom: 10px;
`;

const StepLabel = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.text};
  font-family: "Poppins_600SemiBold";
`;

const ContinueButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.red};
  padding: 15px 30px;
  border-radius: 25px;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "Poppins_600SemiBold";
`;

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
    <Container>
      <AnimatedStep style={{ transform: [{ translateX: slideAnim }] }}>
        <Icon name={steps[currentStep].icon} size={50} />
        <StepLabel>{steps[currentStep].label}</StepLabel>
      </AnimatedStep>
      <ContinueButton onPress={nextStep}>
        <ButtonText>Continue</ButtonText>
      </ContinueButton>
    </Container>
  );
};

export default FiveFiveFourFourThreeThreeTwoTwoOneOneOne;
