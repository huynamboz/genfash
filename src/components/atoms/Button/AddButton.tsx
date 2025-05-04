import React, { Pressable } from 'react-native';
import { SVGIcon, SVGIconType } from '../Icon';
interface AddButtonProps {
  onPress: () => void;
  className?: string;
  iconClassName?: string;
  iconName?: SVGIconType;
}
const AddButton = ({
  onPress,
  className = '',
  iconName = 'plus_02',
  iconClassName = '',
}: AddButtonProps) => {
  return (
    <Pressable onPress={onPress} className={`bg-primary-9 self-start p-2 rounded-lg ${className}`}>
      <SVGIcon name={iconName} size={16} className={`fill-white ${iconClassName}`} />
    </Pressable>
  );
};

export default AddButton;
