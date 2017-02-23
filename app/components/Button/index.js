import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Button = ({ style, onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[styles.root, style]}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  style: View.propTypes.style,
  onPress: TouchableOpacity.propTypes.onPress,
  title: PropTypes.string.isRequired,
};

export default Button;
