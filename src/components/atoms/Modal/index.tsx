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
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onPressOutside}
    {...props}
  >
    <Pressable
      onPress={onPressOutside}
      className="items-center justify-center flex-1 px-4 bg-opacity-50 bg-black-alpha-6"
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
