import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Button = ({ style, onPress, title }) => (
  <View style={[styles.root, style]} elevation={1}>
    <TouchableOpacity onPress={onPress} style={styles.content}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  </View>
);

Button.propTypes = {
  style: View.propTypes.style,
  onPress: TouchableOpacity.propTypes.onPress,
  title: PropTypes.string.isRequired,
};

export default Button;
