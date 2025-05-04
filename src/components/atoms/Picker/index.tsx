import { Picker as RNPicker } from '@react-native-picker/picker';
import React from 'react';

interface PickerProps {
  initialValue?: { label: string; value: string };
  onValueChange: (itemValue: { label: string; value: string }) => void;
  options: { label: string; value: string }[];
}

const Picker = ({ initialValue, onValueChange, options }: PickerProps) => {
  const [localValue, setLocalValue] = React.useState(initialValue);

  function handleValueChange(value: string) {
    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return;
    setLocalValue(selectedOption);
    onValueChange(selectedOption);
  }

  return (
    <RNPicker selectedValue={localValue?.value} onValueChange={handleValueChange}>
      {options.map((option) => (
        <RNPicker.Item key={option.value} label={option.label} value={option.value} />
      ))}
    </RNPicker>
  );
};

export { Picker };
