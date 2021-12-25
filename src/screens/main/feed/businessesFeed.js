import React, { useState, useEffect } from 'react';
import { StyleSheet, LayoutAnimation, FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getBusinesses, resetBusinessesState, deleteBusiness } from '../../../redux/actions'

import { BusinessItem, EmptyBusinessesListPlaceholder } from '../../../components/feed';
import { PlusButton, LoadingIndicator, ErrorPlaceholder } from '../../../components/general';

const BusinessesFeed = () => {
    const dispatch = useDispatch()

    const { loading, error, businesses } = useSelector(state => state.businesses)

    const [refreshing, setRefreshing] = useState(false);

    const keyExtractor = item => item.businessId;

    const renderItem = ({ item }, onDeleteClick) => (
        <BusinessItem
            title={item.name}
            deleteAction={onDeleteClick}
        />
    );

    const navigateToBusinessForm = () => {
        console.log;
    };

    const onRefresh = () => {
        setRefreshing(true);
        _getBusinesses();
    };

    const deleteItem = ({ item, index }) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        dispatch(deleteBusiness({ id: item.businessId }))
    };

    const retryAction = () => {
        dispatch(resetBusinessesState({ getValues: true }));
    };

    const _getBusinesses = () => {
        dispatch(getBusinesses());
    };

    useEffect(() => {
        _getBusinesses();
    }, [dispatch])

    useEffect(() => {
        if (refreshing) {
            setRefreshing(false);
        }
    }, [businesses]);

    if (loading) {
        return <LoadingIndicator />
    }

    if (error !== undefined) {
        return <ErrorPlaceholder
            error={`Error: ${error?.data?.message}`}
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
                data={businesses}
                renderItem={(values) => renderItem(values, () => { deleteItem(values) })}
                keyExtractor={keyExtractor}
                onRefresh={onRefresh}
                ListEmptyComponent={<EmptyBusinessesListPlaceholder />}
            />
            <PlusButton action={navigateToBusinessForm} />
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

export default BusinessesFeed