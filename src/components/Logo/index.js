import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { View } from 'moti'

export default function Logo() {
 return (
    <View 
    style={styles.container}
    from={{opacity: 0, translateX: -50}}
    animate={{opacity: 1, translateX: 0}}
    transition={{type: "spring", duration: 850}}
    >
        <Text style={styles.texto}>Receita Fácil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#4cbe6c',
        alignSelf: 'flex-start',
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 32,
        marginBottom: 8
    },
    texto:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})