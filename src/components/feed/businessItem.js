import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { default as RNGHSwipeable } from 'react-native-gesture-handler/Swipeable';
import Swipeable from 'react-native-swipeable';
import PropTypes from 'prop-types';

let row = [];
let prevOpenedRow;

export const BusinessItem = ({ title, index, deleteAction, setIsSwiping, onPressAction }) => {

    const onSwipeStart = () => {
        setIsSwiping(true);
    };

    const onSwipeRelease = () => {
        setIsSwiping(false);
    };

    const closeRow = (index) => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
        return (
            <View
                style={styles.swipeButtonIos}
            >
                <TouchableOpacity onPress={onClick} >
                    <Text style={styles.swipeButtonTextIos}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const rightButtons = [
        <View
            style={styles.swipeButton}
        >
            <TouchableOpacity onPress={deleteAction} >
                <Text style={styles.swipeButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    ];

    if (Platform.OS === 'ios') {
        return (
            <TouchableOpacity onPress={onPressAction}>
                <RNGHSwipeable
                    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, deleteAction)}
                    onSwipeableOpen={() => closeRow(index)}
                    ref={(ref) => (row[index] = ref)}
                    rightOpenValue={-100}
                >
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                </RNGHSwipeable>
            </TouchableOpacity>
        )
    } else {
        return (
            <Swipeable
                rightButtons={rightButtons}
                rightButtonWidth={140}
                onSwipeStart={onSwipeStart}
                onSwipeRelease={onSwipeRelease}
            >
                <TouchableOpacity onPress={onPressAction}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>

            </Swipeable>
        );
    }

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
    swipeButtonIos: {
        margin: 0,
        alignContent: 'center',
        justifyContent: 'center',
        width: 100,
    },
    swipeButtonTextIos: {
        color: 'red',
        fontSize: 24,
    },
    swipeButton: {
        marginTop: 10,
        alignContent: 'center',
        justifyContent: 'center',
        width: 200,
        height: 80
    },
    swipeButtonText: {
        color: 'red',
        fontSize: 32,
    }
});

BusinessItem.propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number,
    deleteAction: PropTypes.func.isRequired
};