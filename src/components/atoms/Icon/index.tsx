import * as svgIcons from '@/assets/icon_svg';
import { cssInterop } from 'nativewind';
import React from 'react';
import { SvgProps } from 'react-native-svg';

type SVGIconType = keyof typeof svgIcons;

interface SVGIconsProps extends SvgProps {
  name: SVGIconType;
  size?: number;
  className?: string;
}

const SVGIcon: React.FC<SVGIconsProps> = ({ name, size = 24, className, ...props }) => {
  const IconComponent = svgIcons[name];

  if (!IconComponent) return null;

  // wrap IconComponent with cssInterop to apply tailwindcss classes
  const StyledIcon = cssInterop(IconComponent, {
    className: 'style',
  });

  return <StyledIcon width={size} height={size} className={className} {...props} />;
};

export { SVGIcon, type SVGIconType };
