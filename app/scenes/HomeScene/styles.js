import { StyleSheet } from 'react-native';
import applicationStyles from '../../theme/application-styles';

const styles = StyleSheet.create({
  ...applicationStyles,

  section: {
    flex: 1,
  },

  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  },

  overlay: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  imageLabel: {
    fontSize: 80,
    color: '#000',
    backgroundColor: 'transparent',
  },
});

export default styles;
