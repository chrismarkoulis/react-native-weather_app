import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, Image, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDayName, getDayNameFirst3Letters, getTime } from '../utils/date-helper';
import { getTimeFromUnix } from '../utils/timezone'
import { capitalizeFirstChar } from '../utils/capitalize'
import { fadeTextColor, normalTextColor } from '../utils/colors'
import { ICONURL } from '../utils/config'

const CityForecast = ({ route, navigation }) => {

    const [cityData, setCityData] = useState()
    const [dailyData, setDailyData] = useState()
    const [currentTimestamp, setCurrentTimestamp] = useState()
    const [timezone, setTimezone] = useState()

    useEffect(() => {
        if (route.params?.forecastData) {
            setCityData(route.params?.forecastData)
            setDailyData(route.params?.forecastData.list.filter(day => day.dt_txt.includes('12:00:00')))
        }
       
    }, [route.params?.forecastData])

    // useEffect(() => {
    //     if (route.params?.weatherData) {
    //         setCurrentTimestamp(route.params?.weatherData.dt)
    //         setTimezone(route.params?.weatherData.timezone)
    //     }
    // }, [route.params?.weatherData])

    dailyData && dailyData.shift()

    //console.log('UNIX TIMESTAMP: ', getTimeFromUnix(timezone));

    console.log('DAILY: ', dailyData);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons
                    onPress={() => {
                        const deleteAction = true
                        navigation.navigate('Weather forecast', { userDeleted: deleteAction })
                    }
                    }
                    name="delete"
                    color="#fff"
                    size={30}
                    style={{ marginRight: 10 }}
                />
            ),
        });
    }, [navigation]);

    return cityData ? (
        <View style={styles.container}>

            <View style={styles.forecast_container}>
                <View style={styles.title_date_temp}>
                    <Text style={styles.title}>
                        {cityData.city.name}, {cityData.city.country}
                    </Text>
                    <Text style={styles.title_date}>
                        {getDayNameFirst3Letters(cityData.list[1].dt_txt)}, {getTime(cityData.list[1].dt_txt)}, {capitalizeFirstChar(cityData.list[1].weather[0].description)}
                    </Text>
                </View>

                <View style={styles.title_temp}>
                    <Text style={styles.main_temp}>{cityData.list[1].main.temp.toFixed()}&#8451;</Text>

                    <Image style={styles.image} source={{ uri: `${ICONURL}/${cityData.list[1].weather[0].icon}@2x.png` }} />
                </View>

                <View style={styles.wind_humidity}>
                    <View style={styles.wind}>
                        <MaterialCommunityIcons
                            name="send"
                            color="grey"
                            size={20} />
                        <Text style={styles.wind_humidity_text}>
                            {cityData.list[1].wind.speed.toFixed()} km/h
                        </Text>
                    </View>
                    <View style={styles.humidity}>
                        <MaterialCommunityIcons
                            name="water-percent"
                            color="grey"
                            size={20} />
                        <Text style={styles.wind_humidity_text}>
                            {cityData.list[1].main.humidity}%
                        </Text>
                    </View>
                </View>
                <View style={styles.forecast_list_container}>
                    {dailyData ? <FlatList data={dailyData}
                        scrollEnabled={false}
                        initialNumToRender={4}
                        //refreshing={isFetching}
                        //onRefresh={() => onRefresh(page, true)}
                        keyExtractor={item => item.dt}
                        renderItem={({ item }) => (
                            <View style={styles.listRow}>
                                <Text style={styles.list_day_text}>
                                    {getDayName(item.dt_txt)}
                                </Text>
                                <View style={styles.list_rightBox}>
                                    <View>
                                        <Text style={styles.list_desc_temp}>
                                            {capitalizeFirstChar(item.weather[0].description)}, {item.main.temp.toFixed()}&#8451;
                                        </Text>
                                    </View>
                                    <Image style={styles.list_image} source={{ uri: `${ICONURL}/${item.weather[0].icon}@2x.png` }} />
                                </View>
                            </View>
                        )} /> : <View style={styles.spinner}>
                        <ActivityIndicator size="large" color="#505050" />
                    </View>}
                </View>
            </View>
        </View>
    ) : (
        <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#505050" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
        //alignItems: 'center'
    },
    spinner: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },
    scrollView: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20
    },
    title_date_temp: {
        paddingBottom: 25
    },
    title: {
        fontSize: 25,
        marginTop: 4,
        color: normalTextColor,
    },
    forecast_container: {
        paddingTop: 2,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 15,
    },
    title_date: {
        color: fadeTextColor
    },
    main_temp: {
        fontSize: 50,
        marginTop: 8,
        color: 'grey'
    },
    title_temp: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
        //justifyContent: 'space-evenly',
        //marginLeft: 'auto'
    },
    image: {
        width: 80,
        height: 70,
        marginLeft: 60,
        marginTop: 12
    },
    list_image: {
        width: 50,
        height: 50,
        marginLeft: 15
    },
    attrName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    attrText: {
        fontSize: 16,
    },
    wind_humidity: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 15
        //justifyContent: 'space-evenly',
    },
    wind: {
        flexDirection: 'row',
        //alignItems: 'center',

    },
    humidity: {
        flexDirection: 'row',
        marginLeft: 60
        // alignItems: 'center'
    },
    wind_humidity_text: {
        marginLeft: 30,
        color: fadeTextColor
    },
    forecast_list_container: {
        flex: 0,
        backgroundColor: '#fff',
        //alignItems: 'strech',
        justifyContent: 'center',
    },
    listRow: {
        flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'space-between', // main axis
        alignItems: 'center', // cross axis
        paddingTop: 25,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 2,
    },
    list_day_text: {
        fontSize: 18,
        flex: 0,
        color: normalTextColor
    },
    list_rightBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    list_desc_temp: {
        color: fadeTextColor,
        fontSize: 16,
    }
});

export default CityForecast
