import React from 'react';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface ModalBaseProps extends ModalProps {
  children?: React.ReactNode;
  onPressOutside?: () => void;
  className?: string;
}

const ModalBase: React.FC<ModalBaseProps> = ({
  className = '',
  children,
  visible,
  onPressOutside,
  ...props
}) => (
  <Modal visible={visible} transparent animationType="fade" {...props}>
    <Pressable
      onPress={onPressOutside}
      className="flex-1 px-4 justify-center items-center bg-black-alpha-6 bg-opacity-50"
    >
      <View
        onStartShouldSetResponder={() => true}
        onTouchEnd={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white p-5 rounded-lg w-full ${className}`}
      >
        {children}
      </View>
    </Pressable>
  </Modal>
);

export { ModalBase };
