import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

class InputToggles extends Component {
  static propTypes = {
    style: View.propTypes.style,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeValue: PropTypes.func.isRequired,
  };

  onChangeValue = (value) => {
    const i = this.props.value.indexOf(value);
    if (i === -1) {
      // Add value
      this.props.onChangeValue([...this.props.value, value]);
    } else {
      // Remove value
      this.props.onChangeValue(this.props.value.filter(val => val !== value));
    }
  }

  getValue(i) {
    return (this.props.values || this.props.options)[i];
  }

  renderOption = (option, i) => {
    const value = this.getValue(i);
    const isActive = this.props.value.includes(value);
    return (
      <TouchableOpacity
        key={option}
        style={[
          styles.option,
          i === 0 && styles.option__first,
          i + 1 === this.props.options.length && styles.option__last,
          isActive && styles.option__active,
        ]}
        onPress={() => this.onChangeValue(value)}
      >
        <Text
          style={[
            styles.label,
            isActive && styles.label__active,
          ]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        {this.props.options.map(this.renderOption)}
      </View>
    );
  }
}

export default InputToggles;
