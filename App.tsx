import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import AppNavigation from './src/app/AppNavigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <AppNavigation />
        <Toast />
      </SafeAreaView>
    </>
  );
};

export default App;
