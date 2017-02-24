import { StyleSheet } from 'react-native';
import applicationStyles, { INPUT_HEIGHT, HOT_COLOR } from '../../theme/application-styles';

const styles = StyleSheet.create({
  ...applicationStyles,

  root: {
    backgroundColor: HOT_COLOR,
    height: INPUT_HEIGHT,
    borderRadius: 4,
    shadowOpacity: 0.4,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },

  text: {
    fontSize: INPUT_HEIGHT / 3,
    color: 'white',
  },

});

export default styles;
