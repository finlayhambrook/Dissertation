import { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';

export default function SignUp_Login({ navigation }) {
    // State to store user input for email, password, full name, and verification code
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up
    const [isVerificationStep, setIsVerificationStep] = useState(false); // State for verification step

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
            setIsVerificationStep(true);  // Move to verification step
        } catch (error) {
            console.log('Error signing up:', error.message);
        }
    };

    // Function to handle user login
    const handleLogin = async () => {
        try {
            const signInResponse = await Auth.signIn(email, password);
            console.log('Sign in success:', signInResponse);
            navigation.navigate('Homepage');  // Navigate to Homepage
        } catch (error) {
            console.log('Error signing in:', error.message);
        }
    };

    // Function to handle account verification with code
    const handleVerification = async () => {
        try {
            const confirmSignUpResponse = await Auth.confirmSignUp(email, verificationCode);
            console.log('Account confirmed successfully:', confirmSignUpResponse);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Homepage' }],
            });

        } catch (error) {
            console.log('Error verifying account:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {isVerificationStep ? (
                <>
                    <Text style={styles.title}>Enter Verification Code</Text>
                    <Text>We've sent a code to your email.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter verification code"
                        onChangeText={setVerificationCode}
                        value={verificationCode}
                    />
                    <Button title="Verify" onPress={handleVerification} />
                </>
            ) : isSignUp ? (
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
