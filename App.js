// This lets us use the .env file that contains the environment variables we use to connect to AWS.
import Constants from 'expo-constants';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// This lets us switch between pages in the app.
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Amplify} from "aws-amplify";
import {SignUp} from "aws-amplify-react-native/src";

// This lets us display and interact with the different pages (Sign-up/login, Homepage, etc.)
import SignUp_Login from './SignUp_Login';
import Homepage from './Homepage';
import AccountTab from './AccountTab';

// Connect to the user pool in my AWS account via Amplify.
// Auth variables declared in .env as best practice instead of hardcoding variables.
// This obfuscates these sensitive variables from source code.
Amplify.configure({
  Auth: {
    region: Constants.expoConfig.extra.AWS_REGION,
    userPoolId: Constants.expoConfig.extra.AWS_USER_POOL_ID,
    userPoolWebClientId: Constants.expoConfig.extra.AWS_USER_POOL_CLIENT_ID
  }
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define the tab navigator with the Home and Account tabs
function MainAppTabs() {
  return (
      <Tab.Navigator
          screenOptions={{
            tabBarIcon: () => null,
            tabBarLabelStyle: { // This is for the text.
              fontSize: 16,
              alignSelf: 'center',
            },
            tabBarStyle: { // This is so the text is in the middle
              justifyContent: 'center',
              height: 60, // This gives the navbar some presence.
              alignItems: 'center',
              flexDirection: 'row',
            },
            headerShown: false, // Removes the header. This function is performed by the navbar already.
          }}
      >
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen name="Account" component={AccountTab} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Login screen outwith the Tab Navigator */}
          <Stack.Screen name="Login" component={SignUp_Login} />
          {/* MainAppTabs includes the Home and Account tabs */}
          <Stack.Screen name="MainApp" component={MainAppTabs} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});