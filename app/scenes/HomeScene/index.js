import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
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
      <View style={[styles.mainContainer, styles.mainContainer__full]}>
        <TouchableHighlight style={styles.section} onPress={searchDogs}>
          <Image source={require('../../images/dog-nose-1440.jpg')} style={styles.image}>
            <LinearGradient colors={['transparent', 'rgba(255, 255, 255, 0.8)']} style={styles.overlay}>
              <Text style={styles.imageLabel}>Dogs</Text>
            </LinearGradient>
          </Image>
        </TouchableHighlight>
        <TouchableHighlight style={styles.section} onPress={searchCats}>
          <Image source={require('../../images/cat-nose-1440.jpg')} style={styles.image}>
            <LinearGradient colors={['transparent', 'rgba(255, 255, 255, 0.8)']} style={styles.overlay}>
              <Text style={styles.imageLabel}>Cats</Text>
            </LinearGradient>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }
}
