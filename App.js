import React from 'react';
import FileSelect from './components/pages/FileSelection';
import NavigationService from './services/navigationService';
import { SafeAreaView, View, StatusBar  } from 'react-native';
import MainLayout from './components/mainLayout';
import { StyleService } from './services/StyleService';

export default function App() {

    // Register all page components here
    
    NavigationService.register("fileSelect", React.createElement(FileSelect));

    return (
        <MainLayout />
    );
}