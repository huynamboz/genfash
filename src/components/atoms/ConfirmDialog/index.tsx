// import Images from '@/assets/image';
import { Button } from '@/components/atoms/Button';
import React, { createContext, useContext, useRef, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { SVGIcon } from '../Icon';
interface ConfirmDialogContext {
  (data: ConfirmDialogData): Promise<boolean>;
}

const ConfirmDialog = createContext<ConfirmDialogContext>(() => Promise.resolve(false));

interface ConfirmDialogProviderProps {
  children: React.ReactNode;
}

interface DialogState {
  isOpen: boolean;
}

interface ButtonDialogProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'destructive';
}
interface ConfirmDialogData {
  title: string;
  message?: string;
  isOnlyConfirm?: boolean;
  confirmButton?: ButtonDialogProps;
  cancelButton?: ButtonDialogProps;
}

export function ConfirmDialogProvider({ children }: ConfirmDialogProviderProps) {
  const [data, setData] = useState<ConfirmDialogData & DialogState>({ isOpen: false, title: '' });
  console.log('confirm', data);

  // prevent re-rendering
  const resolverConfirm = useRef<(value: boolean) => void | null>(null);

  async function confirm(data: ConfirmDialogData): Promise<boolean> {
    return new Promise((resolve) => {
      setData({ ...data, isOpen: true });

      // prevent memory leak -> only keep the latest resolver
      if (resolverConfirm.current) {
        resolverConfirm.current(false);
      }

      resolverConfirm.current = (isConfirmed: boolean) => {
        setData({ ...data, isOpen: false });
        resolve(isConfirmed);
        resolverConfirm.current = null; // reset
      };
    });
  }

  return (
    <ConfirmDialog.Provider value={confirm}>
      {children}
      <Modal
        visible={data.isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => resolverConfirm.current && resolverConfirm.current(false)}
      >
        <View className="flex-1 justify-center items-center px-4 bg-black-alpha-6 bg-opacity-50">
          <View className="flex flex-col items-center bg-white p-5 rounded-xl w-[350px] max-w-full">
            <Pressable
              onPress={() => resolverConfirm.current && resolverConfirm.current(false)}
              className="flex-row w-full justify-end"
            >
              <View className="size-8 flex justify-center items-center">
                <SVGIcon name="x_01" size={16} color="red" />
              </View>
            </Pressable>
            <Text className="text-xl flex-wrap text-center font-semibold mt-6">
              {data.title || 'Confirm'}
            </Text>
            {data.message && <Text className="mt-2">{data.message}</Text>}
            <View className="flex-col w-full gap-2 justify-end mt-6">
              <Button
                text={data.confirmButton?.text || 'Confirm'}
                variant={data.confirmButton?.variant || 'primary'}
                onPress={() => resolverConfirm.current && resolverConfirm.current(true)}
                className="w-full"
              />
              {!data.isOnlyConfirm && (
                <Button
                  text={data.cancelButton?.text || 'Cancel'}
                  variant={data.cancelButton?.variant || 'secondary'}
                  onPress={() => resolverConfirm.current && resolverConfirm.current(false)}
                  className="w-full"
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ConfirmDialog.Provider>
  );
}

function useConfirm() {
  return useContext(ConfirmDialog);
}

export { useConfirm, type ConfirmDialogData };
