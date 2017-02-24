import React, { Component } from 'react';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';
import styles from './styles';

const searchDogs = () => Actions.search({ species: 'dog' });
const searchCats = () => Actions.search({ species: 'cat' });

export default class Home extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <Image
        source={require('../../images/dog-nose-tall.jpg')}
        style={[styles.mainContainer, styles.mainContainer__full, styles.image]}
      >
        <Button style={styles.button} title="Search Dogs" onPress={searchDogs} />
        <Button style={styles.button} title="Search Cats" onPress={searchCats} />
      </Image>
    );
  }
}
