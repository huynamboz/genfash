import React from 'react';
import { Pressable } from 'react-native';
import { SVGIcon, SVGIconType } from '../Icon';
import { Spinner } from '../Spinner';
import Text from '../Text';

interface ActionButtonProps {
  text: string;
  iconName: SVGIconType;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  classNameText?: string;
  variant?: 'primary' | 'secondary' | 'destructive';
}

const ActionButton = ({
  text,
  iconName,
  isLoading = false,
  disabled = false,
  onPress,
  className = '',
  classNameText = '',
  variant = 'primary',
}: ActionButtonProps) => {
  const baseClasses = `flex-col gap-1 items-center rounded-xl px-6 py-3 md:px-[44px] md:py-[33px] w-auto self-start`;
  const variantClasses = variant === 'secondary' ? 'bg-primary-4-alpha' : 'bg-primary-5-alpha';
  const disabledClasses = disabled || isLoading ? '!bg-neutral-alpha-3' : '';
  const loadingClasses = isLoading ? 'py-6' : '';
  const textColor = disabled ? 'text-neutral-alpha-8' : 'text-primary-11-alpha';
  const iconColor = disabled ? 'fill-neutral-alpha-8' : 'fill-primary-11-alpha';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className} ${loadingClasses}`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SVGIcon className={iconColor} name={iconName} />
          <Text className={`text-sm md:text-base ${classNameText} ${textColor}`}>{text}</Text>
        </>
      )}
    </Pressable>
  );
};

export { ActionButton, type ActionButtonProps };
