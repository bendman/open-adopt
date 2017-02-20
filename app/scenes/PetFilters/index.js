import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BlurView from '../../components/BlurView';
import InputLocation from '../../components/InputLocation';
import InputToggles from '../../components/InputToggles';
import { Actions as FilterActions } from '../../data/petFilters';
import { PetSpeciesModel } from '../../data/models/pet';
import styles, { HOT_COLOR } from './styles';

const getStateFilters = propFilters => ({
  location: propFilters.location || 'Portland, OR',
  sizes: propFilters.sizes || [],
  ages: propFilters.ages || [],
  sexes: propFilters.sexes || [],
});

class PetFilters extends Component {
  static propTypes = {
    species: PetSpeciesModel.isRequired,
    filters: PropTypes.shape({
      location: PropTypes.string,
      sizes: PropTypes.arrayOf(PropTypes.oneOf([
        'Small', 'Medium', 'Large', 'Extra Large',
      ])),
      ages: PropTypes.arrayOf(PropTypes.oneOf([
        'Baby', 'Young', 'Adult', 'Senior',
      ])),
      sexes: PropTypes.arrayOf(PropTypes.oneOf([
        'Male', 'Female',
      ])),
    }),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: false,
      filters: getStateFilters(this.props.filters),
    };
  }

  componentDidMount() {
    // Start modal animation
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isOpen: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextFilters = getStateFilters(nextProps);
    if (R.equals(this.state.filters, nextFilters)) {
      this.setState({ filters: nextFilters });
    }
  }

  onChangeLocation = location => this.setState({ filters: { ...this.state.filters, location } });
  onChangeSize = sizes => this.setState({ filters: { ...this.state.filters, sizes } });
  onChangeAge = ages => this.setState({ filters: { ...this.state.filters, ages } });
  onChangeSex = sexes => this.setState({ filters: { ...this.state.filters, sexes } });

  close = () => {
    this.props.onChange({
      species: this.props.species,
      location: this.state.filters.location,
      sizes: this.state.filters.sizes,
      ages: this.state.filters.ages,
      sexes: this.state.filters.sexes,
    });
    Actions.pop();
  }

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onRequestClose={this.close}
        animationType="slide"
        style={styles.modalWrapper}
        transparent={true}
      >
        <BlurView style={[styles.mainContainer__noNav, styles.modalContent]}>
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={this.close}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 20 }}
            >
              <Icon style={styles.icon} name="close" size={24} color={HOT_COLOR} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>LOCATION</Text>
          <InputLocation
            style={styles.field}
            value={this.state.filters.location}
            onChangeValue={this.onChangeLocation}
          />

          <Text style={styles.label}>SIZE</Text>
          <InputToggles
            style={[styles.field, styles.pill]}
            options={['S', 'M', 'L', 'XL']}
            values={['Small', 'Medium', 'Large', 'Extra Large']}
            value={this.state.filters.sizes}
            onChangeValue={this.onChangeSize}
          />

          <Text style={styles.label}>AGE</Text>
          <InputToggles
            style={[styles.field, styles.pill]}
            options={['Baby', 'Young', 'Adult', 'Senior']}
            value={this.state.filters.ages}
            onChangeValue={this.onChangeAge}
          />

          <Text style={styles.label}>GENDER</Text>
          <InputToggles
            style={[styles.field, styles.pill]}
            options={['M', 'F']}
            values={['Male', 'Female']}
            value={this.state.filters.sexes}
            onChangeValue={this.onChangeSex}
          />

        </BlurView>
      </Modal>
    );
  }
}

export default connect(
  (state, props) => ({
    filters: state.petFilters[props.species],
  }),
  dispatch => ({
    onChange: filters => dispatch(FilterActions.setFilters(filters)),
  }),
)(PetFilters);
