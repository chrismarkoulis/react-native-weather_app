import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDayName, getDayNameFirst3Letters, getTime } from '../utils/date-helper';
import { capitalizeFirstChar } from '../utils/capitalize'
import { fadeTextColor, normalTextColor } from '../utils/colors'
import { ICONURL } from '../utils/config'

const CityForecast = ({ route, navigation }) => {

    const [cityData, setCityData] = useState()
    const [dailyData, setDailyData] = useState()

    useEffect(() => {
        if (route.params?.forecastData) {
            setCityData(route.params?.forecastData)
            setDailyData(route.params?.forecastData.list.filter(day => day.dt_txt.includes('12:00:00')))
        }
    }, [route.params?.forecastData])

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
                />
            ),
        });
    }, [navigation]);

    return cityData ? (
        <View style={styles.container}>

            <View style={styles.title_container}>
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
                        <Text>
                            7 km/h
                        </Text>
                    </View>
                    <View style={styles.humidity}>
                        <MaterialCommunityIcons
                            name="water-percent"
                            color="grey"
                            size={20} />
                        <Text>
                            43%
                        </Text>
                    </View>
                </View>

            </View>
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
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
        //alignItems: 'center'
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
    title_container: {
        //alignItems: 'flex-start',
        paddingLeft: 15,
        paddingBottom: 15
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
        marginTop: 30
        //justifyContent: 'space-evenly',
    },
    wind: {
        flexDirection: 'row',
        //alignItems: 'center',
        
    },
    humidity: {
        flexDirection: 'row',
        marginLeft: 100
       // alignItems: 'center'
    }
});

export default CityForecast
