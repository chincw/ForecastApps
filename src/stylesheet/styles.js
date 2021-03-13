import { StyleSheet } from 'react-native';

export const FONT_FAMILY = {
  superlight: 'Roboto-Thin',
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
};

export const FONT = {
  xxxlarge: 26,
  xxlarge: 24,
  xlarge: 22,
  large: 20,
  medium: 18,
  small: 16,
  xsmall: 14,
};

export const THEME = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8E8E8',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  fontThin: {
    fontFamily: FONT_FAMILY.superlight,
  },
  fontLight: {
    fontFamily: FONT_FAMILY.light,
  },
  fontRegular: {
    fontFamily: FONT_FAMILY.regular,
  },
  fontBold: {
    fontFamily: FONT_FAMILY.bold,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  fontXsmall: {
    fontSize: FONT.xsmall,
  },
  fontSmall: {
    fontSize: FONT.small,
  },
  fontMedium: {
    fontSize: FONT.medium,
  },
  fontLarge: {
    fontSize: FONT.large,
  },
  fontXlarge: {
    fontSize: FONT.xlarge,
  },
  fontXXlarge: {
    fontSize: FONT.xxlarge,
  },
  fontXXXlarge: {
    fontSize: FONT.xxxlarge,
  },
  padding10: {
    padding: 10,
  },
});
