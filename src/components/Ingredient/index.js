import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Ingredient(props) {
    return (
        <View style={styels.container}>
            <Text style={styels.name}>{props.ingrediente}</Text>
            <Text>{props.quant}</Text>
        </View>
    );
}

const styels = StyleSheet.create({
    container:{
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold'
    }
})