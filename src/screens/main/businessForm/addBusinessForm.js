import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '../../../components/general';
import { useCreateBusiness, useUpdateBusiness } from '../../../hooks/addBusinessForm';
import { useDeleteBusiness } from '../../../hooks/businesses';

const AddBusinessForm = ({ route, navigation }) => {
    const business = route?.params?.business;

    const deleteMutation = useDeleteBusiness();
    const updateMutation = useUpdateBusiness();
    const createMutation = useCreateBusiness();

    const {
        isSuccess,
        isLoading,
        isError: createMutationIsError,
        error: createMutationError
    } = createMutation;

    const {
        isSuccess: updateMutationIsSuccess,
        isLoading: updateMutationIsLoading,
        isError: updateMutationIsError,
        error: updateMutationError
    } = updateMutation;

    const {
        isLoading: deleteMutatioIsLoading,
        isSuccess: deleteMutatioIsSuccess,
        isError: deleteMutationIsError,
        error: deleteMutationError
    } = deleteMutation;

    const [text, onChangeText] = useState(business?.name || undefined);

    const isEditable = useMemo(() => {
        return (isLoading || deleteMutatioIsLoading || updateMutationIsLoading) ? false : true;
    }, [isLoading, deleteMutatioIsLoading, updateMutationIsLoading]);

    const inputStyle = useMemo(() => {
        return (isLoading || deleteMutatioIsLoading || updateMutationIsLoading) ? styles.disabledInput : styles.input;
    }, [isLoading, deleteMutatioIsLoading, updateMutationIsLoading]);

    const createUpdateButtonTitle = useMemo(() => {
        return business !== undefined ? 'Update business' : 'Create business';
    }, [business])

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
                    onPress: () => deleteMutation.mutate(business?.businessId)
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

    const updateAction = () => {
        if (!!text) {
            updateMutation.mutate({ businessId: business?.businessId, name: text });
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
        if (deleteMutationIsError) {
            Alert.alert(
                "Deleting Business Error",
                `${deleteMutationError.message}`,
                [
                    { text: "OK" }
                ]
            );
        }
    }, [deleteMutationIsError, deleteMutationError]);

    useEffect(() => {
        if (updateMutationIsError) {
            Alert.alert(
                "Updating Business Error",
                `${updateMutationError.message}`,
                [
                    { text: "OK" }
                ]
            );
        }
    }, [updateMutationIsError, updateMutationError]);

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
        if (deleteMutatioIsSuccess) {
            Alert.alert(
                'Deleting Business Success',
                undefined,
                [
                    { text: 'OK', onPress: () => navigation.navigate('BusinessesFeed') }
                ]
            );
        }
    }, [deleteMutatioIsSuccess])

    useEffect(() => {
        if (updateMutationIsSuccess) {
            Alert.alert(
                'Updating Business Success',
                undefined,
                [
                    { text: 'OK', onPress: () => navigation.navigate('BusinessDetails', { business: { ...business, name: text } }) }
                ]
            );
        }
    }, [updateMutationIsSuccess])

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
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ flex: 1 }}>

                    <View style={styles.container}>
                        <TextInput
                            editable={isEditable}
                            style={inputStyle}
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder='Business name'
                            returnKeyType="done"
                        />
                    </View>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
                        {business !== undefined && (
                            <Button
                                disabled={isLoading || updateMutationIsLoading || deleteMutatioIsLoading}
                                loading={deleteMutatioIsLoading}
                                title='Delete business'
                                backgroundColor='red'
                                action={deleteBusiness}
                            />
                        )}
                        <Button
                            disabled={isLoading || updateMutationIsLoading || deleteMutatioIsLoading}
                            loading={isLoading || updateMutationIsLoading}
                            title={createUpdateButtonTitle}
                            backgroundColor='blue'
                            action={business !== undefined ? updateAction : createAction}
                        />
                    </KeyboardAvoidingView>
                </View>
            </KeyboardAwareScrollView>
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
        borderRadius: 5,
        borderColor: 'gray',
    },
});

export default AddBusinessForm;