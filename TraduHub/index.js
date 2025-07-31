import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './package.json';

// Polyfills pour React Native
import 'react-native-url-polyfill/auto';

AppRegistry.registerComponent(appName, () => App);