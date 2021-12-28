import React, { useState, useEffect } from 'react';
import { StyleSheet, LayoutAnimation, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import { useBusinesses, useDeleteBusiness } from '../../../hooks/businesses';
import { BusinessItem } from '../../../components/feed';
import { usePersonsMutation } from '../../../hooks/businessDetails';
import { useDeletePerson } from '../../../hooks/addPersonForm';
import { PlusButton, LoadingIndicator, ErrorPlaceholder, EmptyListPlaceholder } from '../../../components/general';
import { useAlert } from '../../../hooks/utils';

const BusinessesFeed = ({ navigation }) => {
    const deleteMutation = useDeleteBusiness();
    const deletePersonMutation = useDeletePerson();
    const fetchPersonsMutation = usePersonsMutation();

    const {
        data,
        error,
        refetch,
        isLoading,
        isSuccess,
        isFetching
    } = useBusinesses();

    const {
        isSuccess: mutationIsSuccess,
        isLoading: mutationIsLoading,
        isError: mutationIsError,
        error: mutationError
    } = deleteMutation;

    const [refreshing, setRefreshing] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);

    const navigateToAddBusinessForm = () => {
        navigation.navigate('AddBusinessForm');
    };

    const navigateToBusinessDetails = ({ item }) => {
        navigation.navigate('BusinessDetails', { business: item });
    };

    const updateIsSwiping = (swiping) => {
        setIsSwiping(swiping)
    };

    const keyExtractor = item => item.businessId;

    const renderItem = ({ item }, onDeleteClick, onPressAction, mutationIsLoading) => (
        <BusinessItem
            title={item.name}
            deleteAction={onDeleteClick}
            setIsSwiping={updateIsSwiping}
            onPressAction={onPressAction}
            mutationIsLoading={mutationIsLoading}
        />
    );

    const onRefresh = () => {
        setRefreshing(true);
        refetch();
    };

    const deleteItem = async ({ item, index }) => {
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
                    onPress: () => {
                        deleteMutation.mutate({
                            businessId: item.businessId,
                            getPersonMutation: fetchPersonsMutation,
                            deletePersonMutation: deletePersonMutation
                        });
                    }
                }
            ]
        });
    };

    const retryAction = () => {
        refetch();
    };

    useEffect(() => {
        if (mutationIsError) {
            useAlert({ title: 'Deleting Business Error', message: `${mutationError.message}` });
        }
    }, [mutationIsError, mutationError]);

    useEffect(() => {
        if (refreshing && !isFetching) {
            setRefreshing(false);
        }
    }, [isFetching]);

    useEffect(() => {
        if (mutationIsSuccess) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            useAlert({ title: 'Business Deleted' });
        }
    }, [mutationIsSuccess]);

    if (isLoading) {
        return <LoadingIndicator />
    }

    if (!isSuccess) {
        return <ErrorPlaceholder
            error={`Error: ${error.message}`}
            retryAction={retryAction}
        />
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                scrollEnabled={!isSwiping}
                contentContainerStyle={styles.listContentContainer}
                style={styles.list}
                refreshing={refreshing}
                showsVerticalScrollIndicator={true}
                data={data?.businesses}
                renderItem={(values) => renderItem(values, () => { deleteItem(values) }, () => navigateToBusinessDetails(values), mutationIsLoading)}
                keyExtractor={keyExtractor}
                onRefresh={onRefresh}
                ListEmptyComponent={<EmptyListPlaceholder />}
            />
            <PlusButton action={navigateToAddBusinessForm} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    list: {
        flex: 1
    },
    listContentContainer: {
        flexGrow: 1,
    }
});

export default BusinessesFeed;