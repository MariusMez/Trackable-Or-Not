import { AppRegistry } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import {name as appName} from '../app.json';

import HomeScreen from './screens/HomeScreen'
import PredictScreen from './screens/PredictScreen'

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Prediction: { screen: PredictScreen }
})

AppRegistry.registerComponent(appName, () => App);