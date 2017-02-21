import { StyleSheet } from 'react-native';
import { INPUT_HEIGHT, INPUT_FONT_SIZE } from '../../theme/application-styles';

const styles = StyleSheet.create({
  root: {
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 8,
    backgroundColor: 'rgba(240, 240, 240, 0.7)',
  },

  icon: {
    margin: 8,
  },

  icon_wrapper: {
    position: 'relative',
    zIndex: 2,
  },

  input: {
    height: INPUT_HEIGHT,
    position: 'absolute',
    left: 34,
    right: 34,
    top: 0,
    bottom: 0,
    color: '#666',
    textAlign: 'center',
    fontSize: INPUT_FONT_SIZE,
    lineHeight: INPUT_FONT_SIZE * 2,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

export default styles;
