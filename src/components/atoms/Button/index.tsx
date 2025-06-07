import React from 'react';
import { Image, ImageSourcePropType, Pressable, View } from 'react-native';
import { SVGIcon, SVGIconType } from '../Icon';
import { Text } from '../Text';

interface ButtonProps {
  icon?: ImageSourcePropType;
  iconLeftName?: SVGIconType;
  iconRightName?: SVGIconType;
  text?: string;
  variant?: keyof typeof buttonVariants;
  color?: string;
  className?: string;
  classNameText?: string;
  iconClassName?: string;
  iconSize?: number;
  textFont?: string;
  onPress?: () => void;
  disabled?: boolean;
  contentClassName?: string;
}

const buttonVariants = {
  primary: {
    base: 'flex items-center rounded px-4 py-3',
    text: 'font-medium ',
    defaultColor: 'bg-primary',
  },
  text: {
    base: 'flex items-center rounded bg-transparent px-4 py-3',
    text: 'font-medium text-gray-800',
    defaultColor: '',
  },
  secondary: {
    base: 'flex items-center rounded px-4 py-3 border border-[#141026]',
    text: 'font-medium ',
    defaultColor: 'bg-[#141026]',
  },
  destructive: {
    base: 'flex items-center rounded px-4 py-3',
    text: 'font-medium ',
    defaultColor: 'bg-error',
  },
};

const Button = ({
  icon,
  iconLeftName,
  iconRightName,
  text,
  variant = 'primary',
  color,
  className = '',
  classNameText = '',
  iconClassName = '',
  iconSize = 20,
  textFont = 'text-base',
  onPress,
  disabled = false,
  contentClassName = '',
}: ButtonProps) => {
  const variantStyle = buttonVariants[variant] || buttonVariants.primary;

  const buttonStyle = [
    variantStyle.defaultColor ? `${variantStyle.defaultColor} ` : '',
    color ? `bg-${color} ` : '',
    variantStyle.base,
    disabled ? 'opacity-50 ' : '',
    className,
  ].join(' ');

  const textStyle = [variantStyle.text, textFont].join(' ');

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`flex-row justify-center items-center ${contentClassName} ${buttonStyle}`}
    >
      {icon && (
        <View>
          {React.isValidElement(icon) ? (
            icon
          ) : (
            <Image source={icon as ImageSourcePropType} className={`w-6 h-6 ${iconClassName}`} />
          )}
        </View>
      )}
      {iconLeftName && (
        <SVGIcon name={iconLeftName} size={iconSize} className={`fill-white ${iconClassName}`} />
      )}
      {text && <Text className={`mx-2 ${textStyle} ${classNameText}`}>{text}</Text>}
      {iconRightName && (
        <SVGIcon name={iconRightName} size={iconSize} className={`fill-white ${iconClassName}`} />
      )}
    </Pressable>
  );
};

export { Button, type ButtonProps };
