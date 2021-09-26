import React from 'react';
import { Button, View, Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CityList from '../screens/S1_CityList';
import AddCity from '../screens/S2_AddCity';
import CityForecast from '../screens/S3_CityForecast';

import { headerColor, headerTextColor } from '../utils/colors'
import { State } from 'react-native-gesture-handler';


const Stack = createStackNavigator();

const NavigationStack = () => {

    return (
        <Stack.Navigator
            initialRouteName="Weather forecast"
            screenOptions={{
                headerTintColor: headerTextColor,
                headerStyle: { backgroundColor: headerColor },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name="Weather forecast"
                component={CityList}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <MaterialCommunityIcons
                            onPress={() => navigation.navigate('Add new city')}
                            name='plus'
                            color='#fff'
                            size={30}
                        />
                    ),
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name='thermometer'
                            color='#fff'
                            size={30}
                        />
                    ),

                })}
            />
            <Stack.Screen
                name="Add new city"
                component={AddCity}
                // options={({ navigation, route }) => ({
                   
                // })}
            />
            <Stack.Screen
                name="5 day forecast"
                component={CityForecast}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <MaterialCommunityIcons
                            onPress={() => navigation.navigate('Weather forecast')}
                            name="delete"
                            color="#fff"
                            size={30}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
}

export default NavigationStack