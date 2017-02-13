import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ListView } from 'react-native';
import { Actions, NavBar } from 'react-native-router-flux';
import styles from './styles';

import PetModel, { mocks } from '../../data/models/pet';

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


export default class Search extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    animal: PropTypes.oneOf(['dog', 'cat']).isRequired,
    results: PropTypes.arrayOf(PetModel),
  };

  static defaultProps = {
    results: mocks.petList,
  };

  static getTitle(props) {
    switch (props.animal) {
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
        onRight={() => Actions.petFilters()}
      />
    );
  }

  constructor(...args) {
    super(...args);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.results),
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView
          contentContainerStyle={styles.resultsContainer}
          dataSource={this.state.dataSource}
          renderRow={renderRow}
        />
      </View>
    );
  }
}
