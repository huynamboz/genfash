import React from 'react';
import { Modal, ModalProps } from 'react-native';

interface BottomSheetBaseProps extends ModalProps {
  children?: React.ReactNode;
}

const BottomSheetBase: React.FC<BottomSheetBaseProps> = ({ children, visible, ...props }) => (
  <Modal animationType="slide" presentationStyle="pageSheet" visible={visible} {...props}>
    {children}
  </Modal>
);

export { BottomSheetBase };
