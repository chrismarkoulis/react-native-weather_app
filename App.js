import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import NavigationStack from './app/navigation/NavigationStack';

const App = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  )
}

export default App