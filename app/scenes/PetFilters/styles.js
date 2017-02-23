import { StyleSheet } from 'react-native';
import applicationStyles, { NAV_BAR_HEIGHT, HOT_COLOR } from '../../theme/application-styles';

export { HOT_COLOR };

const MODAL_PADDING = 20;

export default StyleSheet.create({
  ...applicationStyles,

  icon: {
    backgroundColor: 'transparent',
  },

  modalWrapper: {
    flex: 1,
  },

  scrollWrapper: {
    flex: 1,
  },

  scrollContent: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },

  splitContent: {
    alignItems: 'center',
    flexGrow: 1,
  },

  splitActions: {
    padding: MODAL_PADDING,
  },

  topBar: {
    alignSelf: 'stretch',
    height: NAV_BAR_HEIGHT,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  field: {
    marginBottom: 40,
    marginHorizontal: MODAL_PADDING,
    alignSelf: 'stretch',
  },

  pill: {
    alignSelf: 'center',
  },
});
