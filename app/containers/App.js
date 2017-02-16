import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from '../data/store';
import Home from '../scenes/HomeScene';
import Search from '../scenes/SearchScene';
import PetFilters from '../scenes/PetFilters';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="modal" component={Modal}>
            <Scene key="root" style={{ flex: 1 }}>
              <Scene key="home" component={Home} title="Home" hideNavBar={true} initial={true} />
              <Scene key="search" component={Search} hideNavBar={false} />
            </Scene>
            <Scene key="petFilters" component={PetFilters} hideNavBar={true} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
