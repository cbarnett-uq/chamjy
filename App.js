import React from 'react';
import Session from './components/pages/session';
import NavigationService from './services/navigationService';
import { SafeAreaView, View, StatusBar  } from 'react-native';
import MainLayout from './components/mainLayout';
import { StyleService } from './services/StyleService';
import InitPage from './components/pages/init';
import Library from './components/pages/library';

export default function App() {
    // Register all page components here
    NavigationService.register("init", React.createElement(InitPage));
    NavigationService.register("session", React.createElement(Session));
    NavigationService.register("library", React.createElement(Library));

    return (
        <SafeAreaView style={StyleService.layout.outerContainer}>
            <MainLayout />
        </SafeAreaView>
  );
}