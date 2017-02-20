import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

// Allow importing modules to use the label styles as well
export { styles };

const LabeledText = ({ style, children, label }) => (
  <View style={[styles.root, style]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{children}</Text>
  </View>
);

LabeledText.propTypes = {
  style: View.propTypes.style,
  label: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default LabeledText;
