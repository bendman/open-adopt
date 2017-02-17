import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions, NavBar } from 'react-native-router-flux';
import { Actions as PetActions } from '../../data/petSearch';
import styles from './styles';

import PetModel, { PetSpeciesModel } from '../../data/models/pet';

const renderRow = pet => (
  <View style={styles.resultsItem}>
    <View style={styles.resultsItem_imageWrapper} elevation={2}>
      <Image source={{ uri: pet.photos[0].small }} style={styles.resultsItem_image} />
    </View>
    <View style={styles.resultsItem_details}>
      <Text style={styles.resultsItem_name} numberOfLines={1} ellipsizeMode="tail">
        {pet.name}
      </Text>
      <Text style={styles.resultsItem_meta} numberOfLines={2}>
        {pet.size === 'Extra Large' ? 'XL' : pet.size} / {pet.age} / {pet.sex}
      </Text>
    </View>
  </View>
);


class Search extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    species: PetSpeciesModel.isRequired,
    results: PropTypes.arrayOf(PetModel),
    doSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    results: [],
  };

  static getTitle(props) {
    switch (props.species) {
      case 'cat':
        return 'Find a Cat';
      case 'dog':
        return 'Find a Dog';
      default:
        return '';
    }
  }

  static renderNavigationBar(passedProps) {
    return (
      <NavBar
        {...passedProps}
        getTitle={Search.getTitle}
        rightTitle="Filter"
        onRight={() => Actions.petFilters({ species: passedProps.species })}
      />
    );
  }

  constructor(...args) {
    super(...args);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.results),
    };
  }

  componentWillMount() {
    this.loadInitialResults();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results !== this.props.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.results),
      });
    }
  }

  componentDidUpdate(prevProps) {
    // If we change the results page to a difference species, load results for
    // that species
    if (this.props.species !== prevProps.species) {
      this.loadInitialResults();
    }
  }

  loadInitialResults() {
    if (!this.props.results.length) this.props.doSearch();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView
          contentContainerStyle={styles.resultsContainer}
          dataSource={this.state.dataSource}
          renderRow={renderRow}
          enableEmptySections
        />
      </View>
    );
  }
}

export default connect(
  (state, props) => ({
    results: state.petSearch[props.species].results,
  }),
  (dispatch, props) => ({
    doSearch: () => dispatch(PetActions.searchRequest({ species: props.species })),
  }),
)(Search);
