import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { SVGIcon } from '../Icon';
import Text from '../Text';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  disabled?: boolean;
  className?: string;
  invalid?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label = '',
  placeholder = '',
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  disabled,
  className,
  invalid,
  errorMessage,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Animated values
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  return (
    <View className={`w-full ${className}`}>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        className={`flex-row h-[56px] items-center border rounded-xl px-4 py-2 bg-neutral-alpha-3
          ${disabled ? 'border-gray-300 bg-gray-100' : ''}
          ${isFocused ? 'border-primary-8-alpha' : ' border-transparent'}
          ${invalid ? '!border-tomato-alpha-11 !bg-error-alpha-3' : ''}
          `}
      >
        <View className="flex-1 relative">
          {/* Animated Label */}
          <Animated.Text
            style={{
              position: 'absolute',
              left: 0,
              fontSize: labelPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12],
              }),
              top: labelPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 0],
              }),
              fontWeight: '400',
            }}
            className={`text-neutral-alpha-9 
              ${invalid ? 'text-error-alpha-9' : ''}
              `}
          >
            {label}
          </Animated.Text>

          {/* Input */}
          <TextInput
            ref={inputRef} // Gán ref
            className="text-neutral-12 w-full mt-5"
            placeholder={isFocused ? '' : placeholder} // Ẩn placeholder khi focus
            value={value}
            style={{ fontSize: 16 }}
            onChangeText={onChangeText}
            secureTextEntry={isSecure}
            keyboardType={keyboardType}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {/* Toggle Password Visibility */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} disabled={disabled}>
            <SVGIcon
              name={isSecure ? 'eye_closed' : 'eye_open'}
              size={24}
              color={disabled ? '#A0A0A0' : '#000'}
            />
          </TouchableOpacity>
        )}
      </Pressable>

      {invalid && errorMessage && (
        <Text className="text-tomato-alpha-11 mt-1 mx-4 text-sm">{errorMessage}</Text>
      )}
    </View>
  );
};

export { Input, type InputProps };
