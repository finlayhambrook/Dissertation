import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Homepage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lets make a booking!</Text>
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
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
    },
});

