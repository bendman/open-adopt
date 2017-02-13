import { StyleSheet } from 'react-native';
import { INPUT_HEIGHT, INPUT_FONT_SIZE } from '../../theme/application-styles';

const styles = StyleSheet.create({
  root: {
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: INPUT_HEIGHT / 2,
  },

  option: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    minWidth: 60,
  },

  option__active: {
    backgroundColor: 'red',
  },

  option__first: {
    paddingLeft: 16,
    borderTopLeftRadius: (INPUT_HEIGHT / 2) - 1,
    borderBottomLeftRadius: (INPUT_HEIGHT / 2) - 1,
  },
  option__last: {
    paddingRight: 16,
    borderTopRightRadius: (INPUT_HEIGHT / 2) - 1,
    borderBottomRightRadius: (INPUT_HEIGHT / 2) - 1,
  },

  label: {
    color: 'red',
    fontSize: INPUT_FONT_SIZE,
  },

  label__active: {
    color: 'white',
  },

});

export default styles;
