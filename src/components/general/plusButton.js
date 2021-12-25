import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const PlusButton = ({ action, size = 35, color = 'black' }) => (
    <View style={styles.container}>
        <FontAwesome.Button
            name='plus'
            size={size}
            color={color}
            backgroundColor='white'
            onPress={action}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});