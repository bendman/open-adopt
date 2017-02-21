import React, { Component, PropTypes } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getLocation } from '../../utils/geolocation';
import styles from './styles';

class InputLocation extends Component {
  static propTypes = {
    style: View.propTypes.style,
    value: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func.isRequired,
  };

  useLocation = async () => {
    const location = await getLocation();
    this.props.onChangeValue(location);
  }

  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TouchableOpacity onPress={this.useLocation} style={styles.icon_wrapper}>
          <Icon style={styles.icon} name="location-searching" size={20} color="rgba(0, 0, 0, 0.4)" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={this.props.value}
          onChangeText={this.props.onChangeValue}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

export default InputLocation;
