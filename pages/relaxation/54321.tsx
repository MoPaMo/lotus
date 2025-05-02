import { useState, useEffect } from 'react';
import styled from 'styled-components';

const steps = [
  { count: 5, icon: 'eye', label: '5 Dinge sehen' },
  { count: 5, icon: 'ear-listen', label: '5 Dinge hören' },
  { count: 5, icon: 'wind', label: '5 Dinge riechen' },
  { count: 4, icon: 'eye', label: '4 Dinge sehen' },
  { count: 4, icon: 'ear-listen', label: '4 Dinge hören' },
  { count: 4, icon: 'wind', label: '4 Dinge riechen' },
  { count: 3, icon: 'eye', label: '3 Dinge sehen' },
  { count: 3, icon: 'ear-listen', label: '3 Dinge hören' },
  { count: 3, icon: 'wind', label: '3 Dinge riechen' },
  { count: 2, icon: 'eye', label: '2 Dinge sehen' },
  { count: 2, icon: 'ear-listen', label: '2 Dinge hören' },
  { count: 2, icon: 'wind', label: '2 Dinge riechen' },
  { count: 1, icon: 'eye', label: '1 Sache sehen' },
  { count: 1, icon: 'ear-listen', label: '1 Sache hören' },
  { count: 1, icon: 'wind', label: '1 Sache riechen' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.base};
  padding: 20px;
`;

const AnimatedStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  transition: transform 0.3s ease-in-out;
`;

const Icon = styled.div`
  font-size: 50px;
  color: ${(props) => props.theme.red};
  margin-bottom: 10px;
`;

const StepLabel = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.text};
  font-family: 'Poppins_600SemiBold';
`;

const ContinueButton = styled.button`
  background-color: ${(props) => props.theme.red};
  padding: 15px 30px;
  border-radius: 25px;
  color: #fff;
  font-size: 18px;
  font-family: 'Poppins_600SemiBold';
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const FiveFiveFourFourThreeThreeTwoTwoOneOneOne = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [slideAnim, setSlideAnim] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setSlideAnim(100);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSlideAnim(-100);
        setTimeout(() => {
          setSlideAnim(0);
        }, 300);
      }, 300);
    }
  };

  return (
    <Container>
      <AnimatedStep style={{ transform: `translateX(${slideAnim}px)` }}>
        <Icon>{steps[currentStep].icon}</Icon>
        <StepLabel>{steps[currentStep].label}</StepLabel>
      </AnimatedStep>
      <ContinueButton onClick={nextStep}>Weiter</ContinueButton>
    </Container>
  );
};

export default FiveFiveFourFourThreeThreeTwoTwoOneOneOne;
