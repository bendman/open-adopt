import React, { PropTypes } from 'react';
import { View } from 'react-native';
import styles from './styles';

// BlurView currently has issues in Android, so skip it.
const BlurViewProxy = ({ style, children }) => (
  <View blurType="light" blurAmount={30} style={[styles.root, style]}>
    {children}
  </View>
);

BlurViewProxy.propTypes = {
  style: View.propTypes.style,
  children: PropTypes.node,
};

export default BlurViewProxy;
