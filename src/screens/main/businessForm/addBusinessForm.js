import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Alert } from 'react-native';

import { Button } from '../../../components/general';
import { useCreateBusiness } from '../../../hooks';

const AddBusinessForm = ({ route, navigation }) => {
    const business = route?.params?.business;

    const createMutation = useCreateBusiness();

    const {
        isSuccess,
        isLoading,
        isError: createMutationIsError,
        error: createMutationError
    } = createMutation;

    const [text, onChangeText] = useState(undefined);

    const deleteBusiness = () => {
        Alert.alert(
            'Delete Business',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => console.log("Delete Pressed")
                }
            ]
        );
    };

    const createAction = () => {
        if (!!text) {
            createMutation.mutate(text);
        } else {
            Alert.alert(
                'Empty field',
                'Please enter a name',
                [
                    { text: 'OK' }
                ]
            );
        }
    };

    useEffect(() => {
        if (createMutationIsError) {
            Alert.alert(
                'Creating Business Error',
                `${createMutationError.message}`,
                [
                    { text: 'OK' }
                ]
            );
        }
    }, [createMutationIsError, createMutationError]);

    useEffect(() => {
        if (isSuccess) {
            Alert.alert(
                'Creating Business Success',
                undefined,
                [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]
            );
        }
    }, [isSuccess])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Business name'
                />
            </View>
            {business !== undefined && (
                <Button
                    title='Delete business'
                    backgroundColor='red'
                    action={deleteBusiness}
                />
            )}
            <Button
                title='Create business'
                backgroundColor='blue'
                action={createAction}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    input: {
        height: 55,
        marginHorizontal: 20,
        borderWidth: 1,
        padding: 10,
    },
});

export default AddBusinessForm;