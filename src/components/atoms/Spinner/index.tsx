import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SVGIcon, SVGIconType } from '../Icon';
const icons: SVGIconType[] = [
  'spinner_01',
  'spinner_02',
  'spinner_03',
  'spinner_04',
  'spinner_05',
  'spinner_06',
  'spinner_07',
  'spinner_08',
];
interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner = ({ className = '' }: SpinnerProps) => {
  const speed = 80;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, speed);
    return () => clearInterval(interval);
  }, [icons.length, speed]);

  return (
    <View className={className}>
      <SVGIcon name={icons[index]} size={24} />
    </View>
  );
};

export { Spinner, type SpinnerProps };
