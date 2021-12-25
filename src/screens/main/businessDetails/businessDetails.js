import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { usePersons } from '../../../hooks/businessDetails';
import { EmptyListPlaceholder, LoadingIndicator, ErrorPlaceholder, PlusButton } from '../../../components/general';
import { PersonItem } from '../../../components/businessDetails';

const BusinessDetails = ({ navigation, route }) => {

    const business = route?.params?.business;

    const {
        data,
        error,
        refetch,
        isLoading,
        isSuccess,
        isFetching
    } = usePersons(business?.businessId);

    const [refreshing, setRefreshing] = useState(false);

    const title = useMemo(() => {
        return business?.name
    }, [business]);

    const keyExtractor = item => item.personId;

    const renderItem = ({ item }) => (
        <PersonItem
            name={item?.name}
            role={item?.role}
            phone={item?.phone}
            email={item?.email}
            date={item?.join_date}
        />
    );

    const navigateToAddBusinessForm = useCallback(() => {
        navigation.navigate('AddBusinessForm', { business: business });
    }, [navigation, business]);

    const onRefresh = () => {
        setRefreshing(true);
        refetch();
    };

    const retryAction = () => {
        refetch();
    };

    useEffect(() => {
        if (refreshing && !isFetching) {
            setRefreshing(false);
        }
    }, [isFetching]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
            headerRight: () => (
                <FontAwesome.Button
                    iconStyle={{ marginRight: 0 }}
                    name='pencil'
                    size={24}
                    color='black'
                    backgroundColor='white'
                    onPress={navigateToAddBusinessForm}
                />
            ),
        });
    }, [navigation, title, navigateToAddBusinessForm]);

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
                data={data?.persons}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onRefresh={onRefresh}
                ListHeaderComponent={!!data?.persons?.length ? <Text style={styles.header}>Persons</Text> : null}
                ListEmptyComponent={<EmptyListPlaceholder text={`No persons.\nAdd persons.`} />}
            />
            <PlusButton action={() => console.log} />
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
        flex: 1,
        marginTop: 12,
    },
    listContentContainer: {
        flexGrow: 1,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 34,
        marginHorizontal: 20,
    }
});

export default BusinessDetails;