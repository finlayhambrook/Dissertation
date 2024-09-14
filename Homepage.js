import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Homepage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Homepage!</Text>
            <Text style={styles.title}>Not much happening here...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffaaa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
