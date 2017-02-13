export const NAV_BAR_HEIGHT = 64;
export const STATUS_BAR_HEIGHT = 20;
export const INPUT_HEIGHT = 50;
export const INPUT_FONT_SIZE = 14;

export default {
  mainContainer: {
    flex: 1,
    marginTop: NAV_BAR_HEIGHT,
  },
  mainContainer__noNav: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  mainContainer__full: {
    flex: 1,
  },
};
