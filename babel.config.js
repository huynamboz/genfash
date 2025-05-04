/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true);
  const envFilePath = '.env';
  return {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
      ['react-native-reanimated/plugin'],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: envFilePath,
        },
      ],
    ],
  };
};
