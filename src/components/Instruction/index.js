import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Instruction({data}) {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{data.id} - </Text>
            <Text style={styles.instruction}>{data.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginBottom: 15,
        padding: 8,
        width: '90%'
    },
    number:{
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    instruction:{
        fontSize: 16,
        lineHeight: 20
    }
})