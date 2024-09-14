import Constants from 'expo-constants';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// This lets us switch between pages in the app.
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// This lets us display and interact with the different pages (Sign-up/login, Homepage, etc.)
import SignUp_Login from './SignUp_Login_OLD_0';
import Homepage from './Homepage';

import {Amplify} from "aws-amplify";
import {SignUp} from "aws-amplify-react-native/src";

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

export default function App() {
  /**
   * return (
   *     <View style={styles.container}>
   *       <Text>ITS REACT TIME</Text>
   *       <StatusBar style="auto" />
   *     </View>
   *   );
   */

  return <SignUp_Login />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
