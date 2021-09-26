import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-elements';

const CityForecast = ({ route, navigation }) => {

    const [cityData, setCityData] = useState("")

    useEffect(() => {
        setCityData(route.params)
    }, [])

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
            <ScrollView style={styles.scrollView}>
                <View style={{ alignItems: 'center' }}>

                    <Text style={styles.title}>
                        {cityData.city.name}
                    </Text>

                    <Text style={styles.sectionTitle}>City Name</Text>
                    <View style={styles.dataItem}>
                        <Text style={styles.attrName}>Name: </Text>
                        <Text style={styles.attrText}>{cityData.city.name}</Text>
                    </View>

                    <Divider style={{ height: 2, width: '60%', backgroundColor: 'grey', marginTop: 16 }} />
                </View>
            </ScrollView>
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
        alignItems: 'center'
    },
    scrollView: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 32,
        marginTop: 4
    },
    sectionTitle: {
        fontSize: 26,
        marginTop: 8
    },
    dataItem: {
        width: '100%',
        flexDirection: 'row'
    },
    attrName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    attrText: {
        fontSize: 16,
    }
});

export default CityForecast
