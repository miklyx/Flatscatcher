import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Login'
import List from './components/List'
import Profile from './components/Profile';
import Preferences from './components/Preferences';
import Map from './components/Map';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' style={styles.container}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Map" component={Map} />

        {/* <View style={styles.container}>
          <Top />
          <View class="top">
            
          </View>
          <View class="login">
            <Login />
          </View>
          <Text>main text will be deleted later</Text>
          <StatusBar style="auto" />
        </View> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(66,73,169)',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
