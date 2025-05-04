import React from 'react';
import { Image } from 'react-native';

interface AvatarProps {
  src: string;
  className?: string;
  variant?: 'circle' | 'square';
}

const Avatar: React.FC<AvatarProps> = ({ src, className = '', variant = 'circle' }) => (
  <Image
    source={{ uri: src }}
    className={`size-12 md:size-14 object-cover ${variant === 'square' ? 'rounded-lg' : 'rounded-full'} ${className}`}
  />
);

export { Avatar, type AvatarProps };
