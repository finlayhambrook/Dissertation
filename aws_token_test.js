// This is just to test if we can get the token.

// We can use dotenv here, as we aren't using Expo to load this file.
// Therefore, we can still push this test to GitHub without exposing the server credentials.
require('dotenv').config();

/**
 * We can't use import as this script is ran directly in the IDE for testing,
 * and Node.js does not support ES module syntax (import/export).
 *
 * Thus, we use require.
 */
const { Auth, Amplify} = require('aws-amplify');

Amplify.configure({
    Auth: {
        region: process.env.AWS_REGION,
        userPoolId: process.env.AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.AWS_USER_POOL_CLIENT_ID
    }
});

const getJwtToken = async () => {
    try {
        const user = await Auth.currentAuthenticatedUser(); // Get the currently logged-in user
        const token = user.signInUserSession.idToken.jwtToken; // Extract the JWT token
        console.log('JWT Token:', token); // Log the token
    } catch (error) {
        console.error('Error fetching token:', error.message); // Log any errors
    }
};

// Call the function to test it
getJwtToken();
