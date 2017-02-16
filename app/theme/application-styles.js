import { Platform } from 'react-native';

export const NAV_BAR_HEIGHT = 44;
export const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 10 });
export const INPUT_HEIGHT = 50;
export const INPUT_FONT_SIZE = 14;

export default {
  mainContainer: {
    flex: 1,
    marginTop: NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,
  },
  mainContainer__noNav: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  mainContainer__full: {
    flex: 1,
  },
};
