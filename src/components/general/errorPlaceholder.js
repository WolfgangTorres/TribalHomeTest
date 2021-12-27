import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import PropTypes from 'prop-types';

export const ErrorPlaceholder = ({ error, retryAction }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
        <TouchableOpacity onPress={retryAction}>
            <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
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
    },
    buttonText: {
        color: 'gray',
        fontSize: 24,
        textAlign: 'center'
    }
});

ErrorPlaceholder.propTypes = {
    error: PropTypes.string.isRequired,
    retryAction: PropTypes.func.isRequired
};