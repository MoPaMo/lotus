import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Dimensions } from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.6;

type BreathingExerciseProps = {
  cycles: number;
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;

const AnimatedCircle = styled(Animated.View)`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: ${CIRCLE_SIZE / 2}px;
  background-color: ${(props) => props.theme.flamingo};
  margin-bottom: 40px;
`;

const GuidanceText = styled(Animated.Text)`
  font-size: 24px;
  color: ${(props) => props.theme.text};
  font-family: "Poppins_400Regular";
`;

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ cycles }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [step, setStep] = useState<"Breathe In" | "Hold" | "Breathe Out">(
    "Breathe In"
  );

  useEffect(() => {
    let cycleCount = 0;

    const breatheIn = () => {
      setStep("Breathe In");
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => hold());
    };

    const hold = () => {
      setStep("Hold");
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ]).start(() => breatheOut());
    };

    const breatheOut = () => {
      setStep("Breathe Out");
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        cycleCount += 1;
        if (cycleCount < cycles) {
          breatheIn();
        }
      });
    };

    breatheIn();

    return () => {
      scale.stopAnimation();
      opacity.stopAnimation();
    };
  }, [scale, opacity, cycles]);

  return (
    <Container>
      <AnimatedCircle style={{ transform: [{ scale }] }} />
      <GuidanceText style={{ opacity }}>{step}</GuidanceText>
    </Container>
  );
};

export default BreathingExercise;
