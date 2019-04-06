import React from 'react';
import Home from './components/Home'
import Game from './components/Game'
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Game: {
    screen: Game
  }
});

const AppNavigator = createAppContainer(MainNavigator);
