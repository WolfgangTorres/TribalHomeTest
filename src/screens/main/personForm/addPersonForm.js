import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '../../../components/general';
import { useCreatePerson, useDeletePerson, useUpdatePerson } from '../../../hooks/addPersonForm';
import { useAlert } from '../../../hooks/utils';

const AddPersonForm = ({ route, navigation }) => {
    const business = route?.params?.business;
    const person = route?.params?.person;

    const nameTIRef = useRef();
    const roleTIRef = useRef();
    const emailTIRef = useRef();
    const phoneTIRef = useRef();
    const dateTIRef = useRef();

    const deleteMutation = useDeletePerson(business?.businessId);
    const updateMutation = useUpdatePerson(business?.businessId, person?.personId);
    const createMutation = useCreatePerson(business?.businessId);

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

    const [businessText, onBusinessChangeText] = useState(business?.name || undefined);
    const [personNameText, onPersonNameChangeText] = useState(person?.name || undefined);
    const [personRoleText, onPersonRoleChangeText] = useState(person?.role || undefined);
    const [personEmailText, onPersonEmailChangeText] = useState(person?.email || undefined);
    const [personPhoneText, onPersonPhoneChangeText] = useState(person?.phone || undefined);
    const [personDateText, onPersonDateChangeText] = useState(person?.join_date || undefined);

    const isEditable = useMemo(() => {
        return (isLoading || deleteMutatioIsLoading || updateMutationIsLoading) ? false : true;
    }, [isLoading, deleteMutatioIsLoading, updateMutationIsLoading]);

    const inputStyle = useMemo(() => {
        return (isLoading || deleteMutatioIsLoading || updateMutationIsLoading) ? styles.disabledInput : styles.input;
    }, [isLoading, deleteMutatioIsLoading, updateMutationIsLoading]);

    const createUpdateButtonTitle = useMemo(() => {
        return person !== undefined ? 'Update person' : 'Create person';
    }, [person]);

    const deletePerson = () => {
        useAlert({
            title: 'Delete Person',
            message: 'Are you sure?',
            actions: [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => deleteMutation.mutate(person?.personId)
                }
            ]
        });
    };

    const createUpdateAction = (create = true) => {
        if (!!personNameText && !!personRoleText && !!personEmailText && !!personPhoneText && !!personDateText) {
            create
                ? createMutation.mutate({
                    email: personEmailText,
                    name: personNameText,
                    phone: personPhoneText,
                    role: personRoleText,
                    'join_date': personDateText
                })
                : updateMutation.mutate({
                    email: personEmailText,
                    name: personNameText,
                    phone: personPhoneText,
                    role: personRoleText,
                    'join_date': personDateText
                });
        } else {
            useAlert({ title: 'Empty field(s)', message: 'Please fill all the info' });
        }
    };

    useEffect(() => {
        if (deleteMutationIsError) {
            useAlert({ title: 'Deleting Person Error', message: `${deleteMutationError.message}` });
        }
    }, [deleteMutationIsError, deleteMutationError]);

    useEffect(() => {
        if (updateMutationIsError) {
            useAlert({ title: 'Updating Person Error', message: `${updateMutationError.message}` });
        }
    }, [updateMutationIsError, updateMutationError]);

    useEffect(() => {
        if (createMutationIsError) {
            useAlert({ title: 'Creating Person Error', message: `${createMutationError.message}` });
        }
    }, [createMutationIsError, createMutationError]);

    useEffect(() => {
        if (deleteMutatioIsSuccess) {
            useAlert({
                title: 'Person Deleted',
                actions: [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]
            });
        }
    }, [deleteMutatioIsSuccess])

    useEffect(() => {
        if (updateMutationIsSuccess) {
            useAlert({
                title: 'Person Updated',
                actions: [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]
            });
        }
    }, [updateMutationIsSuccess])

    useEffect(() => {
        if (isSuccess) {
            useAlert({
                title: 'Person Created',
                actions: [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]
            });
        }
    }, [isSuccess])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container}>
                <View>

                    <TextInput
                        editable={false}
                        style={styles.disabledInput}
                        onChangeText={onBusinessChangeText}
                        value={businessText}
                        placeholder='Business name'
                    />
                    <TextInput
                        ref={nameTIRef}
                        editable={isEditable}
                        style={inputStyle}
                        onChangeText={onPersonNameChangeText}
                        value={personNameText}
                        placeholder='Person name'
                        returnKeyType='next'
                        // blurOnSubmit={false}
                        onSubmitEditing={() => { roleTIRef.current.focus(); }}
                    />
                    <TextInput
                        ref={roleTIRef}
                        editable={isEditable}
                        style={inputStyle}
                        onChangeText={onPersonRoleChangeText}
                        value={personRoleText}
                        placeholder='Role'
                        returnKeyType='next'
                        // blurOnSubmit={false}
                        onSubmitEditing={() => { emailTIRef.current.focus(); }}
                    />
                    <TextInput
                        ref={emailTIRef}
                        editable={isEditable}
                        style={inputStyle}
                        onChangeText={onPersonEmailChangeText}
                        value={personEmailText}
                        placeholder='Email'
                        returnKeyType='next'
                        keyboardType='email-address'
                        // blurOnSubmit={false}
                        onSubmitEditing={() => { phoneTIRef.current.focus(); }}
                    />
                    <TextInput
                        ref={phoneTIRef}
                        editable={isEditable}
                        style={inputStyle}
                        onChangeText={onPersonPhoneChangeText}
                        value={personPhoneText}
                        placeholder='Phone'
                        returnKeyType='next'
                        keyboardType='number-pad'
                        // blurOnSubmit={false}
                        onSubmitEditing={() => { dateTIRef.current.focus(); }}
                    />
                    <TextInput
                        ref={dateTIRef}
                        editable={isEditable}
                        style={inputStyle}
                        onChangeText={onPersonDateChangeText}
                        value={personDateText}
                        placeholder='Join Date: yyyy-mm-dd'
                        returnKeyType='done'
                    />
                </View>
            </KeyboardAwareScrollView>
            {person !== undefined && (
                <Button
                    disabled={isLoading || updateMutationIsLoading || deleteMutatioIsLoading}
                    loading={deleteMutatioIsLoading}
                    title='Delete person'
                    backgroundColor='red'
                    action={deletePerson}
                />
            )}
            <Button
                disabled={isLoading || updateMutationIsLoading || deleteMutatioIsLoading}
                loading={isLoading || updateMutationIsLoading}
                title={createUpdateButtonTitle}
                backgroundColor='blue'
                action={() => createUpdateAction(person === undefined)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    disabledInput: {
        color: 'lightgray',
        borderColor: 'lightgray',
        height: 55,
        marginHorizontal: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    input: {
        height: 55,
        marginHorizontal: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        marginBottom: 15,
    },
});

export default AddPersonForm;