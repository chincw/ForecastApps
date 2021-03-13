module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        alias: {
          '@init': './src/initial',
          '@component': './src/component',
          '@reducers': './src/reducers',
          '@stylesheet': './src/stylesheet',
          // '@image': './src/images',
          '@element': './src/elements',
          '@common': './src/commonFunction',
        },
      },
    ],
  ],
};
