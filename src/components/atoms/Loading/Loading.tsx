import { Animations } from '@/assets/animations';
import LottieView from 'lottie-react-native';
import React from 'react';

interface LoadingProps {
  size?: number;
}

const Loading = ({ size = 200 }: LoadingProps) => {
  return (
    <LottieView source={Animations.loading} style={{ width: size, height: size }} autoPlay loop />
  );
};

export { Loading };
