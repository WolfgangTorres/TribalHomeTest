import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export const LoadingIndicator = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
});