declare module '@env' {
  export const WEB_CLIENT_ID: string;
  export const FACEBOOK_APP_ID: string;
  export const MAPBOX_ACCESS_TOKEN: string;
}

declare module '@/assets/icon_svg/*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
