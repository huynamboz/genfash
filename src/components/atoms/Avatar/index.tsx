import Images from '@/assets/images';
import React from 'react';
import { Image as RNImage } from 'react-native';

export const Avatar = ({ url, className }: { url?: string; className?: string }) => {
  return url ? (
    <RNImage source={{ uri: url }} className={`rounded-full size-8 ${className}`} />
  ) : (
    <RNImage source={Images.defaultAvatar} className={`rounded-full size-8 ${className}`} />
  );
};
