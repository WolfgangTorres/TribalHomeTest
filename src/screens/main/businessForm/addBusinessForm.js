import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '../../../components/general';
import { useCreateBusiness, useUpdateBusiness } from '../../../hooks/addBusinessForm';
import { usePersonsMutation } from '../../../hooks/businessDetails';
import { useDeletePerson } from '../../../hooks/addPersonForm';
import { useDeleteBusiness } from '../../../hooks/businesses';
import { useAlert } from '../../../hooks/utils';

const AddBusinessForm = ({ route, navigation }) => {
    const business = route?.params?.business;

    const deletePersonMutation = useDeletePerson();
    const fetchPersonsMutation = usePersonsMutation();
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

    const onDeleteAction = async () => {
        deleteMutation.mutate({
            businessId: business?.businessId,
            getPersonMutation: fetchPersonsMutation,
            deletePersonMutation: deletePersonMutation
        });
    };

    const deleteBusiness = () => {
        useAlert({
            title: 'Delete Business',
            message: 'All business-related information, including people, will be removed. Are you sure?',
            actions: [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: onDeleteAction
                }
            ]
        });
    };

    const createAction = () => {
        if (!!text) {
            createMutation.mutate(text);
        } else {
            useAlert({ title: 'Empty field', message: 'Please enter a name' });
        }
    };

    const updateAction = () => {
        if (!!text) {
            updateMutation.mutate({ businessId: business?.businessId, name: text });
        } else {
            useAlert({ title: 'Empty field', message: 'Please enter a name' });
        }
    };

    useEffect(() => {
        if (deleteMutationIsError) {
            useAlert({ title: 'Deleting Business Error', message: `${deleteMutationError.message}` });
        }
    }, [deleteMutationIsError, deleteMutationError]);

    useEffect(() => {
        if (updateMutationIsError) {
            useAlert({ title: 'Updating Business Error', message: `${updateMutationError.message}` });
        }
    }, [updateMutationIsError, updateMutationError]);

    useEffect(() => {
        if (createMutationIsError) {
            useAlert({ title: 'Creating Business Error', message: `${createMutationError.message}` });
        }
    }, [createMutationIsError, createMutationError]);

    useEffect(() => {
        if (deleteMutatioIsSuccess) {
            useAlert({
                title: 'Business Deleted',
                actions: [{ text: 'OK', onPress: () => navigation.navigate('BusinessesFeed') }]
            });
        }
    }, [deleteMutatioIsSuccess])

    useEffect(() => {
        if (updateMutationIsSuccess) {
            useAlert({
                title: 'Business Updated',
                actions: [{ text: 'OK', onPress: () => navigation.navigate('BusinessDetails', { business: { ...business, name: text } }) }]
            });
        }
    }, [updateMutationIsSuccess])

    useEffect(() => {
        if (isSuccess) {
            useAlert({
                title: 'Business Created',
                actions: [{ text: 'OK', onPress: () => navigation.goBack() }]
            });
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