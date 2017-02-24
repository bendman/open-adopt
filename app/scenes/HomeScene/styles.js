import { StyleSheet } from 'react-native';
import applicationStyles from '../../theme/application-styles';

const styles = StyleSheet.create({
  ...applicationStyles,

  image: {
    height: null,
    width: null,
    resizeMode: 'cover',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
  },

  button: {
    flexGrow: 1,
    margin: 10,
  },

});

export default styles;
