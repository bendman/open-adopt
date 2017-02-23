import { StyleSheet } from 'react-native';
import applicationStyles, { INPUT_HEIGHT, HOT_COLOR } from '../../theme/application-styles';

const styles = StyleSheet.create({
  ...applicationStyles,

  root: {
    backgroundColor: HOT_COLOR,
    height: INPUT_HEIGHT,
    borderRadius: INPUT_HEIGHT / 4,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: INPUT_HEIGHT / 3,
    color: 'white',
  },

});

export default styles;
