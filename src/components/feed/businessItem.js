import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

let row = [];
let prevOpenedRow;

export const BusinessItem = ({ title, index, deleteAction }) => {

    const closeRow = (index) => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
        return (
            <View
                style={styles.swipeButton}
            >
                <TouchableOpacity onPress={onClick} >
                    <Text style={styles.swipeButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Swipeable
            renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, deleteAction)}
            onSwipeableOpen={() => closeRow(index)}
            ref={(ref) => (row[index] = ref)}
            rightOpenValue={-100}
        >

            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>

        </Swipeable>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightgray',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 32,
    },
    swipeButton: {
        margin: 0,
        alignContent: 'center',
        justifyContent: 'center',
        width: 100,
    },
    swipeButtonText: {
        color: 'red',
        fontSize: 24,
    }
});