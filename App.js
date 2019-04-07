import React from 'react';
import Home from './components/Home'
import Game from './components/Game'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Provider } from 'react-redux'
import store from './components/store/store'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
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
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#42426A',
      height: 30,
    },
    headerTintColor: '#9191E9',
  },
}
);


const AppNavigator = createAppContainer(MainNavigator);
