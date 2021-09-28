import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDayName, getDayNameFirst3Letters, getTime, getTimeFromTimezone } from '../utils/date-helper';
import { capitalizeFirstChar } from '../utils/capitalize'
import { fadeTextColor, normalTextColor } from '../utils/colors'
import { ICONURL } from '../utils/config'

const CityForecast = ({ route, navigation }) => {

    const [cityData, setCityData] = useState()
    const [dailyData, setDailyData] = useState()
    const [dailyDataCrop, setDailyDataCrop] = useState()
    // const [timestamp, setTimestamp] = useState()
    // const [timezone, setTimezone] = useState()

    useEffect(() => {
        if (route.params?.forecastData) {
            setCityData(route.params?.forecastData)
            setDailyData(route.params?.forecastData.list.filter(day => day.dt_txt.includes('12:00:00')))
            // setTimestamp(route.params?.forecastData.list[0].dt)
            // setTimezone(route.params?.forecastData.timezone)
        }
    }, [route.params?.forecastData])


    useEffect(() => {
        if (cityData && dailyData) {
            const d = new Date()
            const today = d.toISOString().slice(0, 10)
            
            const currentForecast = dailyData.filter(item => item.dt_txt.includes(today))
            console.log(currentForecast);
            const cropped = dailyData.filter(item => item !== currentForecast[0])
            setDailyDataCrop(cropped)
        }

    }, [cityData, dailyData])


    console.log('DAILY: ', dailyDataCrop);

    //route.params?.forecastData && console.log(getTimeFromTimezone(timestamp, timezone));

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
                        {getDayNameFirst3Letters(cityData.list[0].dt_txt)}, {getTime(cityData.list[0].dt_txt)}, {capitalizeFirstChar(cityData.list[0].weather[0].description)}
                    </Text>
                </View>

                <View style={styles.title_temp}>
                    <Text style={styles.main_temp}>{cityData.list[1].main.temp.toFixed()}&#8451;</Text>

                    <Image style={styles.image} source={{ uri: `${ICONURL}/${cityData.list[0].weather[0].icon}@2x.png` }} />
                </View>

                <View style={styles.wind_humidity}>
                    <View style={styles.wind}>
                        <MaterialCommunityIcons
                            name="send"
                            color="grey"
                            size={25} />
                        <Text style={styles.wind_humidity_text}>
                            {cityData.list[1].wind.speed.toFixed()} km/h
                        </Text>
                    </View>
                    <View style={styles.humidity}>
                        <MaterialCommunityIcons
                            name="water-percent"
                            color="grey"
                            size={25} />
                        <Text style={styles.wind_humidity_text}>
                            {cityData.list[1].main.humidity}%
                        </Text>
                    </View>
                </View>
                <View style={styles.forecast_list_container}>
                    {dailyData ? <FlatList data={dailyDataCrop}
                        scrollEnabled={false}
                        initialNumToRender={4}
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
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 15,
    },
    title_date: {
        color: fadeTextColor
    },
    main_temp: {
        fontSize: 62,
        marginTop: 8,
        color: 'grey'
    },
    title_temp: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 90,
        height: 80,
        marginLeft: 50,
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
        marginTop: 40,
        marginBottom: 10
    },
    wind: {
        flexDirection: 'row',
    },
    humidity: {
        flexDirection: 'row',
        marginLeft: 60
    },
    wind_humidity_text: {
        marginLeft: 30,
        color: fadeTextColor,
        alignSelf: 'center'
    },
    forecast_list_container: {
        flex: 0,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    listRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
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
