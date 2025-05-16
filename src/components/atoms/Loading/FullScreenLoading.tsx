import { Animations } from '@/assets/animations';
import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

interface FullScreenLoadingProps {
  className?: string;
  isVisible?: boolean;
  children?: React.ReactNode;
}

const FullScreenLoading = ({
  className = '',
  isVisible = false,
  children,
}: FullScreenLoadingProps) => {
  if (!isVisible) return null;

  return (
    <View
      className={`absolute z-50 top-0 left-0 right-0 bottom-0 bg-[#0c081c5e] items-center justify-center ${className}`}
    >
      <View className="flex-col items-center justify-center">
        <LottieView source={Animations.loading} style={{ width: 200, height: 200 }} autoPlay loop />
        {children}
      </View>
    </View>
  );
};

export { FullScreenLoading };
