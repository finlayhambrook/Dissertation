import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Function to handle login and retrieve JWT token
export const loginAndGetToken = async (email, password) => {
    try {
        const signInResponse = await Auth.signIn(email, password);
        console.log('Sign in success:', signInResponse);

        const session = await Auth.currentSession();
        const jwtToken = session.getIdToken().getJwtToken();
        console.log('JWT Token:', jwtToken);  // Log the token

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('jwtToken', jwtToken);
        console.log('Token successfully stored in AsyncStorage');  // Log this to confirm

        return jwtToken;
    } catch (error) {
        console.error('Error signing in:', error.message);
        throw error;
    }
};


// Function to retrieve the token from AsyncStorage
export const getStoredToken = async () => {
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
            console.log('Token not found in AsyncStorage');
            throw new Error('Token not found');
        }
        console.log('Retrieved JWT Token:', token);  // Log the retrieved token
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

export const checkSessionAndGetToken = async () => {
    try {
        // Ensure the user is signed in
        const session = await Auth.currentSession();
        const jwtToken = session.getIdToken().getJwtToken();
        console.log('JWT Token from session:', jwtToken);  // Log the token from the current session
        return jwtToken;
    } catch (error) {
        console.error('No active session found:', error);
        return null;
    }
};


// Function to clear the token (e.g., on logout)
export const clearToken = async () => {
    try {
        await AsyncStorage.removeItem('jwtToken');
        console.log('JWT Token cleared');
    } catch (error) {
        console.error('Error clearing token:', error);
    }
};
