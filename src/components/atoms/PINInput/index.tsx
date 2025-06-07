import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Text } from '../Text';

const styles = StyleSheet.create({
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
});
interface PinInputProps {
  cellCount?: number;
  onFinish?: (value: string) => void;
}
const PinInput = ({ cellCount = 6, onFinish }: PinInputProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  useEffect(() => {
    if (value.length === cellCount) {
      onFinish?.(value);
    }
  }, [value]);
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          onLayout={getCellOnLayoutHandler(index)}
          className={`bg-gray-700 w-[40px] h-[52px] rounded-xl text-center flex items-center justify-center border ${
            isFocused ? 'border border-primary-8-alpha' : 'border-transparent'
          }`}
        >
          <Text className="text-xl text-white">{symbol || (isFocused ? <Cursor /> : null)}</Text>
        </View>
      )}
    />
  );
};

export { PinInput };
