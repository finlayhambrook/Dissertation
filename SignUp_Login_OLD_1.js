import { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

export default function App() {

    // State to store user input for email and password.
    // Defaults to blank, stores whatever is entered dynamically.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle user sign-up
    const handleSignUp = async () => {
        try {
            const signUpResponse = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,  // Optional additional attributes
                }
            });
            console.log('Sign up success:', signUpResponse);
        } catch (error) {
            console.log('Error signing up:', error.message);
        }
    };

    // Function to handle user login
    const handleLogin = async () => {
        try {
            const signInResponse = await Auth.signIn(email, password);
            console.log('Sign in success:', signInResponse);
        } catch (error) {
            console.log('Error signing in:', error.message);
        }
    };

    // This is what is actually displayed to the user; the UI.
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login or Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                onChangeText={setPassword}
                value={password}
                // Obfuscates password with *s.
                secureTextEntry
            />

            // Calls the method to sign a user up.
            <Button title="Sign Up" onPress={handleSignUp} />
            <View style={{ margin: 10 }} />
            // Calls the method to login a user.
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
    },
});
