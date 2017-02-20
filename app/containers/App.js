import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from '../data/store';
import Home from '../scenes/HomeScene';
import Search from '../scenes/SearchScene';
import PetFilters from '../scenes/PetFilters';
import Profile from '../scenes/ProfileScene';
import styles from '../theme/application-styles';

const navStyles = {
  rightButtonTextStyle: styles.navBarText,
  leftButtonIconStyle: styles.navBarIcon,
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="modal" component={Modal}>
            <Scene key="root" style={{ flex: 1 }}>
              <Scene key="home" component={Home} title="Home" hideNavBar={true} initial={true} {...navStyles} />
              <Scene key="search" component={Search} hideNavBar={false} {...navStyles} />
              <Scene key="profile" component={Profile} hideNavBar={false} {...navStyles} />
            </Scene>
            <Scene key="petFilters" component={PetFilters} hideNavBar={true} {...navStyles} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
