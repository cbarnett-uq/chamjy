import React from 'react';
import Session from './components/pages/session';
import NavigationService from './services/navigationService';
import { SafeAreaView } from 'react-native';
import MainLayout from './components/mainLayout';
import { StyleService } from './services/StyleService';

export default function App() {
  // Register all page components here
  NavigationService.register("session", React.createElement(Session));

  return (
    <SafeAreaView style={StyleService.layout.outerContainer}>
      <MainLayout/>
    </SafeAreaView>
  );
}