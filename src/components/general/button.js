import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const Button = ({ action, backgroundColor = 'blue', title }) => (
    <TouchableOpacity
        style={{ ...styles.container, backgroundColor }}
        onPress={action}
    >
        <Text style={styles.buttonText} >{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        marginHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
    },
});