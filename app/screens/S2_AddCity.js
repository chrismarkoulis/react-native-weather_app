import React, { useState, useEffect, useLayoutEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Alert,
    Keyboard,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Button,
    Pressable
} from 'react-native'
import { API_BASEURL, API_KEY } from '../utils/config'

const AddCity = ({ navigation, route }) => {
    const [search, setSearch] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons
                    onPress={async () => {
                        try {
                            const res = await fetch(`${API_BASEURL}/weather?q=${search}&appid=${API_KEY}`);
                            const searchResp = await res.json();
                            console.log('API CALL...!!!');
                            if (search === '' || searchResp.cod == '404') {
                                Alert.alert('Validation', `${searchResp.message}\nPlease enter a valid city name`, [{ text: 'OK' }]);
                            } else {
                                navigation.navigate('Weather forecast', { searchResponse: searchResp })
                                //Alert.alert('Navigation to main', `${search}`, [{ text: 'OK' }])
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    }
                    name="check"
                    color="#fff"
                    size={30}
                />
            ),
        });
    }, [navigation, search]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.heading}>City</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g.New York"
                        onChangeText={(val) => setSearch(val)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    heading: {
        // fontSize: 20,
        // textAlign: 'center',
        marginBottom: -8,
        // alignItems: 'flex-left'
        //color: '#4169E1',
        color: '#0080ff',
        marginTop: 10
    },
    input: {
        borderWidth: 2,
        borderColor: '#0080ff',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
});

export default AddCity
