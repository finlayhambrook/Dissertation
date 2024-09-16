import React, { useState } from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import { Auth } from 'aws-amplify';

export default function AccountScreen({ navigation }) {

    const [newName, setNewName] = useState('');
    const [isNameUpdate, setIsNameUpdate] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
    const [isPasswordCodeStep, setIsPasswordCodeStep] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [isEmailUpdate, setIsEmailUpdate] = useState(false);
    const [isEmailCodeStep, setIsEmailCodeStep] = useState(false);

    const [verificationCode, setVerificationCode] = useState('');


    const handleNameChange = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, {
                name: newName,
            });
            console.log('Name updated successfully');
            setIsNameUpdate(false); // Hide name change input after successful update
        } catch (error) {
            console.log('Error updating name:', error);
        }
    };


    const handleEmailChangeRequest = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, { email: newEmail });
            console.log('Email verification code sent to new email');
            setIsEmailCodeStep(true); // Move to code input step
        } catch (error) {
            console.log('Error requesting email change:', error);
        }
    };

    const handleEmailChangeSubmit = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.verifyCurrentUserAttributeSubmit('email', verificationCode);
            console.log('Email updated successfully');
            setIsEmailUpdate(false);
            setIsEmailCodeStep(false);
        } catch (error) {
            console.log('Error updating email:', error);
        }
    };



    const handlePasswordChangeRequest = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.forgotPassword(user.username);
            setIsPasswordCodeStep(true); // Move to code input step
            console.log('Verification code sent to email');
        } catch (error) {
            console.log('Error requesting password change:', error);
        }
    };

    const handlePasswordChangeSubmit = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.forgotPasswordSubmit(user.username, verificationCode, newPassword);
            console.log('Password updated successfully');
            setIsPasswordUpdate(false);
            setIsPasswordCodeStep(false);
        } catch (error) {
            console.log('Error updating password:', error);
        }
    };


    const cancelUpdate = () => {
        setIsNameUpdate(false);
        setIsPasswordUpdate(false);
        setIsPasswordCodeStep(false);
    };


    const handleLogout = async () => {
        try {
            await Auth.signOut();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Page</Text>

            {/* Name Change Section */}
            {isNameUpdate ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new name"
                        onChangeText={setNewName}
                        value={newName}
                    />
                    <Button title="Change Name" onPress={handleNameChange} />
                    <Button title="Cancel" onPress={() => setIsNameUpdate(false)} />
                </>
            ) : !isPasswordUpdate && !isEmailUpdate ? (
                <Button title="Change Name" onPress={() => setIsNameUpdate(true)} />
            ) : null}

            {/* Email Change Section */}
            {isEmailUpdate ? (
                isEmailCodeStep ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter verification code"
                            onChangeText={setVerificationCode}
                            value={verificationCode}
                        />
                        <Button title="Confirm Email Change" onPress={handleEmailChangeSubmit} />
                        <Button title="Cancel" onPress={() => setIsEmailUpdate(false)} />
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new email"
                            onChangeText={setNewEmail}
                            value={newEmail}
                        />
                        <Button title="Change Email" onPress={handleEmailChangeRequest} />
                        <Button title="Cancel" onPress={() => setIsEmailUpdate(false)} />
                    </>
                )
            ) : !isNameUpdate && !isPasswordUpdate ? (
                <Button title="Change Email" onPress={() => setIsEmailUpdate(true)} />
            ) : null}

            {/* Password Change Section */}
            {isPasswordUpdate ? (
                isPasswordCodeStep ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter verification code"
                            onChangeText={setVerificationCode}
                            value={verificationCode}
                        />
                        <Button title="Confirm Password Change" onPress={handlePasswordChangeRequest} />
                        <Button title="Cancel" onPress={() => setIsPasswordUpdate(false)} />
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            onChangeText={setNewPassword}
                            value={newPassword}
                            secureTextEntry
                        />
                        <Button title="Change Password" onPress={handlePasswordChangeSubmit} />
                        <Button title="Cancel" onPress={() => setIsPasswordUpdate(false)} />
                    </>
                )
            ) : !isNameUpdate && !isEmailUpdate ? (
                <Button title="Change Password" onPress={() => setIsPasswordUpdate(true)} />
            ) : null}

            {/* Logout Section */}
            {!isNameUpdate && !isPasswordUpdate && !isEmailUpdate && (
                <Button title="Logout" onPress={handleLogout} style={styles.logoutButton} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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
    logoutButton: {
        marginTop: 20,
    },
});
