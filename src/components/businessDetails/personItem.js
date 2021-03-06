import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export const PersonItem = ({ name, role, phone, email, date, editAction }) => {

    return (

        <View style={styles.item}>
            <View style={styles.rowContainer}>
                <Text style={styles.personName}>{name}</Text>
                <FontAwesome.Button
                    iconStyle={styles.button}
                    name='pencil'
                    size={20}
                    color='black'
                    backgroundColor='white'
                    onPress={editAction}
                />
            </View>
            <Text style={styles.position}>{role}</Text>
            <View style={styles.rowContainer}>
                <Text style={styles.rowItem}>{phone}</Text>
                <Text style={styles.rowItem}>{email}</Text>
                {/* <Text style={styles.rowItem}>{date}</Text> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 20,
        marginVertical: 8,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    personName: {
        fontSize: 24,
        marginBottom: 8,
    },
    position: {
        fontSize: 16,
        marginBottom: 35,
    },
    rowContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowItem: {
        fontSize: 16,
    },
    button: {
        marginRight: 0,
    }
});

PersonItem.propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string,
    editAction: PropTypes.func.isRequired
};