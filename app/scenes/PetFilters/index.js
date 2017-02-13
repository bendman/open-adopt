import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BlurView from '../../components/BlurView';
import InputLocation from '../../components/InputLocation';
import InputToggles from '../../components/InputToggles';
import styles from './styles';

export default class PetFilters extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(...args) {
    super(...args);
    this.state = {
      location: 'Portland, OR',
      sizes: ['Small', 'Medium'],
      ages: ['Adult'],
      sexes: ['M', 'F'],
    };
  }

  componentDidMount() {
    // Start modal animation
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isOpen: true,
    });
  }

  onChangeLocation = location => this.setState({ location });
  onChangeSize = sizes => this.setState({ sizes });
  onChangeAge = ages => this.setState({ ages });
  onChangeSex = sexes => this.setState({ sexes });

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onRequestClose={Actions.pop}
        animationType="slide"
        style={styles.modalWrapper}
        transparent={true}
      >
        <BlurView style={[styles.mainContainer__noNav, styles.modalContent]}>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={Actions.pop}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 20 }}
            >
              <Icon style={styles.icon} name="close" size={24} color="rgba(0, 0, 0, 0.5)" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>LOCATION</Text>
          <InputLocation
            style={styles.field}
            value={this.state.location}
            onChangeValue={this.onChangeLocation}
          />

          <Text style={styles.label}>SIZE</Text>
          <InputToggles
            style={[styles.field, styles.pill]}
            options={['S', 'M', 'L', 'XL']}
            values={['Small', 'Medium', 'Large', 'Extra Large']}
            value={this.state.sizes}
            onChangeValue={this.onChangeSize}
          />

          <Text style={styles.label}>AGE</Text>
          <InputToggles
            style={[styles.field, styles.pill]}
            options={['Baby', 'Young', 'Adult', 'Senior']}
            value={this.state.ages}
            onChangeValue={this.onChangeAge}
          />

          <Text style={styles.label}>GENDER</Text>
          <InputToggles
            style={[styles.field, styles.pill]}
            options={['M', 'F']}
            value={this.state.sexes}
            onChangeValue={this.onChangeSex}
          />

        </BlurView>
      </Modal>
    );
  }
}
