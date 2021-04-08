import React from 'react';
import { StatusBar } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import moment from 'moment/min/moment-with-locales';
import { Provider as NeophytesProvider } from './src/context/NeophytesContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import CreateScreen from './src/screens/CreateScreen';
import MainScreen from './src/screens/MainScreen';
import DetailScreen from './src/screens/DetailScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import AboutScreen from './src/screens/AboutScreen';
import ErrorBoundary from './src/components/ErrorBoundary';

const navigator = createStackNavigator({
  Main: { screen: MainScreen, navigationOptions: { title: 'Karte', headerShown: false } },
  Create: { screen: CreateScreen, navigationOptions: { title: 'Standort melden', headerShown: true } },
  Detail: { screen: DetailScreen, navigationOptions: { title: 'Detailansicht', headerShown: true, } },
  Activity: { screen: ActivityScreen, navigationOptions: { title: 'Aktivitäten', headerShown: true } },
  Notification: { screen: NotificationScreen, navigationOptions: { title: 'Letze Änderungen', headerShown: true } },
  About: { screen: AboutScreen, navigationOptions: { title: 'About', headerShown: true } },
}, {
  initialRouteName: 'Main',
  defaultNavigationOptions: {
    title: 'Neophyten-Hunting',
    headerShown: false,
  }
});

const App = createAppContainer(navigator);

moment.locale('de');

export default () => {
  return (
    <NeophytesProvider>
      <LocationProvider>
        <SafeAreaProvider>
          <StatusBar backgroundColor='rgba(255, 255, 255, 0)' barStyle={'dark-content'} />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </SafeAreaProvider>
      </LocationProvider>
    </NeophytesProvider>
  );
};
