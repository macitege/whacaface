import React from 'react';
import Home from './components/Home'
import Game from './components/Game'
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: Home,
  Game: Game
});

const AppStackNavigator = createAppContainer(MainNavigator);
