import React from 'react';
import Session from './components/pages/session';
import { NavigationComponent } from './components/navigationComponent';
import NavigationService from './services/navigationService';
import { SafeAreaView } from 'react-native';

export default function App() {
  NavigationService.register("session", React.createElement(Session));

  return (
    <SafeAreaView>
      <NavigationComponent/>
    </SafeAreaView>
  );
}