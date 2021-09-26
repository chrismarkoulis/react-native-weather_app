import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, Image, FlatList, StyleSheet, Text, View, TouchableWithoutFeedback, Pressable, Alert } from 'react-native';
import { State, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { fadeTextColor, normalTextColor } from '../utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASEURL, API_KEY, ICONURL } from '../utils/config'
import { capitalizeFirstChar } from '../utils/capitalize'

const CityList = ({ navigation, route }) => {

    let initialCities = [
        { id: '264371', name: 'Athens' },
        { id: '2643743', name: 'London' },
        { id: '5368361', name: 'Los Angeles' },
        { id: '3413829', name: 'Reykjavik' },
        { id: '1850147', name: 'Tokyo' },
    ]

    const ids = initialCities.map(city => city.id)

    const [predefinedCities, setPredefinedCities] = useState()
    const [cities, setCities] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        try {
            const res = await fetch(`${API_BASEURL}/group?id=${ids}&appid=${API_KEY}`);
            console.log('API CALL...!!!');
            if (!res.ok) {
                const resData = await res.json();
                throw new Error(resData.message);
            }
            const resData = await res.json();
            setCities(resData.list)
            setPredefinedCities(resData.list)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    }, [])


    useEffect(() => {
        if (route.params?.searchResponse) {
            setCities(prevState => [...prevState, route.params?.searchResponse])
        }
    }, [route.params?.searchResponse]);


    useEffect(() => {
        if (route.params?.userDeleted) {
            route.params?.userDeleted && setCities(predefinedCities)
        }
    }, [route.params?.userDeleted]);


    console.log('CITIES :', cities)

    //const addedCity = route.params
    console.log('ME ?: ', route.params?.userDeleted);
    console.log('XWRIS ?: ', route.params?.userDeleted);

    

    const navigateToCityForecast = async (city) => {
        try {
            setLoading(true)
            const res = await fetch(`${API_BASEURL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
            console.log('API CALL...!!!');
            if (!res.ok) {
                const resData = await res.json();
                Alert.alert('Validation', `${resData.message}`, [{ text: 'OK' }]);
            }
            const resData = await res.json();
            setLoading(false)
            navigation.navigate("5 day forecast", { forecastData: resData})
        } catch (error) {
            console.log(error);
        }
    };

    return !loading ? (
        <View style={styles.container}>
            <Text style={styles.listTitle}>
                Cities
            </Text>
            <FlatList
                data={cities}
                scrollEnabled={true}
                initialNumToRender={10}
                //refreshing={isFetching}
                //onRefresh={() => onRefresh(page, true)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listRow}>
                        <Image style={styles.image} source={{ uri: `${ICONURL}/${item.weather[0].icon}@2x.png` }} />
                        <TouchableWithoutFeedback onPress={() => navigateToCityForecast(item.name)}>
                            <View style={styles.item}>
                                <Text style={styles.text_city}>
                                    {item.name}, {item.sys.country}
                                </Text>
                                <Text style={styles.text_weather_desc}>
                                    {capitalizeFirstChar(item.weather[0].description)}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.temp}>
                            {(item.main.temp - 273.15).toFixed()}&#8451;
                        </Text>
                    </View>
                )} />
        </View>
    ) : (
        <View style={styles.container}>
            <Text style={styles.title}>
                Loading...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listRow: {
        flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'flex-start', // main axis
        alignItems: 'center', // cross axis
        paddingTop: 25,
        // paddingBottom: 10,
        // paddingLeft: 5,
        // paddingRight: 16,
        marginLeft: 0,
        marginRight: 5,
        marginTop: 0,
        marginBottom: 6,
    },
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        marginTop: 4
    },
    item: {
        // width: '100%',
        // flexDirection: 'row',
        // padding: 8,
        // fontSize: 18,
        // height: 70,
        flex: 1,
        flexDirection: 'column',
    },
    text_city: {
        fontSize: 18,
        textAlignVertical: 'bottom',
        includeFontPadding: false,
        flex: 0,
        color: normalTextColor
    },
    text_weather_desc: {
        fontSize: 18,
        textAlignVertical: 'top',
        includeFontPadding: false,
        flex: 0,
        color: fadeTextColor
    },
    temp: {
        paddingLeft: 16,
        paddingRight: 5,
        flex: 0,
        fontSize: 27,
        color: normalTextColor
    },
    listTitle: {
        color: fadeTextColor
    },
    image: {
        width: 50,
        height: 40,
    }
});

export default CityList