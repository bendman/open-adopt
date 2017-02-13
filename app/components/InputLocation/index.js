import React, { PropTypes } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const InputLocation = ({ style, value, onChangeValue }) => (
  <View style={[styles.root, style]}>
    <Icon style={styles.icon} name="location-searching" size={20} color="rgba(0, 0, 0, 0.4)" />
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeValue}
      underlineColorAndroid="transparent"
    />
  </View>
);

InputLocation.propTypes = {
  style: View.propTypes.style,
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default InputLocation;
