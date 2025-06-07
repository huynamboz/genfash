import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker, {
  CalendarComponents,
  CalendarDay,
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import { SVGIcon } from '../Icon';
import { Text } from '../Text';

interface DatePickerProps {
  value?: DateType;
  onChange?: (date: DateType) => void;
}

const components: CalendarComponents = {
  Day: (day: CalendarDay) => {
    return (
      <View className={`bg-white size-[44px]`}>
        <View
          className={`w-full h-full rounded-full flex items-center justify-center  ${day.isSelected ? 'bg-primary-4-alpha' : ''}`}
        >
          <Text
            className={`
            text-xl 
           ${day.isSelected || day.isToday ? ' text-[#007AFF]' : ''}
          `}
          >
            {day.text}
          </Text>
        </View>
      </View>
    );
  },
  IconPrev: <SVGIcon name="chevron_left" size={30} className="fill-[#007AFF]" />,
  IconNext: <SVGIcon name="chevron_right" size={30} className="fill-[#007AFF]" />,
  // etc
};

// https://github.com/farhoudshapouran/react-native-ui-datepicker
const DatePicker = ({ value, onChange = () => {} }: DatePickerProps) => {
  const defaultStyles = useDefaultStyles();
  console.log('value', value);
  const [selected, setSelected] = useState<DateType>(value || new Date());

  function handleOnChange(date: DateType) {
    setSelected(date);
    onChange(date);
  }
  return (
    <DateTimePicker
      navigationPosition="right"
      mode="single"
      date={selected}
      onChange={({ date }) => handleOnChange(date)}
      styles={defaultStyles}
      components={components}
    />
  );
};

export { DatePicker };
