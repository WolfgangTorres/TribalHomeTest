import React, { useState, useEffect } from 'react';
import { StyleSheet, LayoutAnimation, FlatList, SafeAreaView, Alert, TouchableOpacity } from 'react-native';

import { useBusinesses, useDeleteBusiness } from '../../../hooks/businesses';
import { BusinessItem } from '../../../components/feed';
import { PlusButton, LoadingIndicator, ErrorPlaceholder, EmptyListPlaceholder } from '../../../components/general';

const BusinessesFeed = ({ navigation }) => {
    const deleteMutation = useDeleteBusiness();

    const {
        data,
        error,
        refetch,
        isLoading,
        isSuccess,
        isFetching
    } = useBusinesses();

    const {
        isError: mutationIsError,
        error: mutationError
    } = deleteMutation;

    const [refreshing, setRefreshing] = useState(false);

    const navigateToAddBusinessForm = () => {
        navigation.navigate('AddBusinessForm');
    };

    const navigateToBusinessDetails = ({ item }) => {
        navigation.navigate('BusinessDetails', { business: item });
    };

    const keyExtractor = item => item.businessId;

    const renderItem = ({ item }, onDeleteClick, onPressAction) => (
        <TouchableOpacity onPress={onPressAction}>
            <BusinessItem
                title={item.name}
                deleteAction={onDeleteClick}
            />
        </TouchableOpacity>
    );

    const onRefresh = () => {
        setRefreshing(true);
        refetch();
    };

    const deleteItem = ({ item, index }) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        deleteMutation.mutate(item.businessId);
    };

    const retryAction = () => {
        refetch();
    };

    useEffect(() => {
        if (mutationIsError) {
            Alert.alert(
                "Deleting Business Error",
                `${mutationError.message}`,
                [
                    { text: "OK" }
                ]
            );
        }
    }, [mutationIsError, mutationError]);

    useEffect(() => {
        if (refreshing && !isFetching) {
            setRefreshing(false);
        }
    }, [isFetching]);

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
                contentContainerStyle={styles.listContentContainer}
                style={styles.list}
                refreshing={refreshing}
                showsVerticalScrollIndicator={true}
                data={data?.businesses}
                renderItem={(values) => renderItem(values, () => { deleteItem(values) }, () => navigateToBusinessDetails(values))}
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