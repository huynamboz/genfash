import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
// import I18n from 'src/constants/i18n';

interface TextProps extends RNTextProps {
  className?: string;
  i18nKey?: string;
}

const Text = React.forwardRef<RNText, TextProps>(
  ({ style, className = '', children, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={`font-default flex-wrap ${className || ''}`}
        style={style}
        {...props}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';

export { Text };
