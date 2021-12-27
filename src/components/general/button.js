import React from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export const Button = ({ action, backgroundColor = 'blue', title, loading = false, disabled = false }) => (
    <TouchableOpacity
        disabled={disabled}
        style={{ ...styles.container, backgroundColor }}
        onPress={action}
    >
        {loading
            ? <ActivityIndicator color="white" />
            : <Text style={styles.buttonText} >{title}</Text>
        }
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

Button.propTypes = {
    action: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    disabled: PropTypes.bool
};