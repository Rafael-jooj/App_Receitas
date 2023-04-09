import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';

export default function FoodList({data}) {
    
    const navigation = useNavigation()

    function handleNavigate(){
        return(
            navigation.navigate("Detail", {data: data})
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>
            <Image source={{uri: data.cover}} style={styles.img} resizeMode='cover'/>
            <View style={styles.box}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.info}>{data.total_ingredients} ingredientes | {data.time} min</Text>
            </View>
            <LinearGradient
                style={styles.gradient}
                colors={['transparent', 'rgba(0,0,0, 0.70)', 'rgba(0,0,0, 0.95)']}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 15
    },
    box:{
        flexDirection: 'row', 
        zIndex: 99, 
        position: 'absolute',
        bottom: 10,
        left: 10,
        flexDirection: 'column'
    },
    title:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    info:{
        color: 'white',
    },
    img:{
        width: '100%',
        height: 200,
        borderRadius: 10,
        position: 'relative',
    },
    gradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '55%',
        borderRadius: 10,
        zIndex: 1
    }
})