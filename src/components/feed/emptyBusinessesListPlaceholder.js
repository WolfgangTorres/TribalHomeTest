import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export const EmptyBusinessesListPlaceholder = () => (
    <View style={styles.container}>
        <Text style={styles.text}>{'No businesses.\nAdd some businesses'}</Text>
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