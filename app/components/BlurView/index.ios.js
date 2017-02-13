import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { BlurView } from 'react-native-blur';

const BlurViewProxy = ({ style, children }) => (
  <BlurView blurType="light" blurAmount={30} style={style}>
    {children}
  </BlurView>
);

BlurViewProxy.propTypes = {
  style: View.propTypes.style,
  children: PropTypes.node,
};

export default BlurViewProxy;
