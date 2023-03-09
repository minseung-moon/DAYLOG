import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from './MainTab';
import WriteScreen from './WriteScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name='MainTab'
            component={MainTab}
            options={{headerShown: false}} // bottom navi에서 이미 header가 존재하기에 중복되지 않게 비활성화
            />
            <Stack.Screen
                name='Write'
                component={WriteScreen}
                options={{headerShown : false}}
            />
        </Stack.Navigator>
    )
}


export default RootStack;