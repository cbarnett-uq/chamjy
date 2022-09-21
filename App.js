import React from 'react';
import Session from './components/pages/session';
import NavigationService from './services/navigationService';
import FileSelect from './components/pages/FileSelection';
import { SafeAreaView, View, StatusBar  } from 'react-native';
import MainLayout from './components/mainLayout';
import { StyleService } from './services/StyleService';

export default function App() {
  // Register all page components here
    NavigationService.register("session", React.createElement(Session));
    NavigationService.register("fileSelect", React.createElement(FileSelect));

  return (
    <SafeAreaView style={StyleService.layout.outerContainer}>
      <MainLayout/>
    </SafeAreaView>
  );
}