import { StyleSheet } from 'react-native';
import applicationStyles, {
  NAV_BAR_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '../../theme/application-styles';

export default StyleSheet.create({
  ...applicationStyles,

  icon: {
    backgroundColor: 'transparent',
  },

  modalWrapper: {
    flex: 1,
  },

  modalContent: {
    alignItems: 'center',
  },

  topBar: {
    alignSelf: 'stretch',
    height: NAV_BAR_HEIGHT - STATUS_BAR_HEIGHT,
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
    marginHorizontal: 20,
    alignSelf: 'stretch',
  },

  pill: {
    alignSelf: 'center',
  },
});