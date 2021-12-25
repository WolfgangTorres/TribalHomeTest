import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BusinessesFeed from '../../screens/main/feed/businessesFeed';

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
        </Stack.Navigator>
    );
};

export default MainStack