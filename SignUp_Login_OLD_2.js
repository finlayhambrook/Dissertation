import { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';

export default function SignUp_Login() {
    // State to store user input for email, password, and full name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up

    // Function to handle user sign-up
    const handleSignUp = async () => {
        try {
            const signUpResponse = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,   // Required email attribute
                    name: fullName  // Full name attribute
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

    return (
        <View style={styles.container}>
            {isSignUp ? (
                <>
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        onChangeText={setFullName}
                        value={fullName}
                    />
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
                        secureTextEntry
                    />
                    <Button title="Sign Up" onPress={handleSignUp} />
                    <TouchableOpacity onPress={() => setIsSignUp(false)}>
                        <Text style={styles.switchText}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.title}>Login</Text>
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
                        secureTextEntry
                    />
                    <Button title="Login" onPress={handleLogin} />
                    <TouchableOpacity onPress={() => setIsSignUp(true)}>
                        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </>
            )}
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
    switchText: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
