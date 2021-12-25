import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BusinessesFeed from '../../screens/main/feed/businessesFeed';
import AddBusinessForm from '../../screens/main/businessForm/addBusinessForm';
import BusinessDetails from '../../screens/main/businessDetails/businessDetails';

const Stack = createNativeStackNavigator();

const mainStackDefaultNavOptions = {
    headerTitleStyle: { color: '#000' },
    gestureEnabled: true,
    headerTintColor: 'black',
    headerBackground: null,
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
    },
    contentStyle: {
        backgroundColor: 'white',
    },
};

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='BusinessesFeed'
            screenOptions={{
                headerMode: 'screen',
                headerTitleAlign: 'center',
                ...mainStackDefaultNavOptions,
            }}
        >
            <Stack.Screen
                name='BusinessesFeed'
                component={BusinessesFeed}
                options={{ title: 'Businesses' }}
            />
            <Stack.Screen
                name='AddBusinessForm'
                component={AddBusinessForm}
                options={{ title: 'Add business' }}
            />
            <Stack.Screen
                name='BusinessDetails'
                component={BusinessDetails}
            />
        </Stack.Navigator>
    );
};

export default MainStack