import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

import {Feather} from '@expo/vector-icons'
import {WebView} from 'react-native-webview'

export default function Video({handleCloseVideo, videoUrl}) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButtom} onPress={handleCloseVideo}>
                <Feather name='arrow-left' size={24} color={'#fff'}/>
                <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <WebView source={{uri: videoUrl}}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%'
    },
    backButtom:{
        width: '100%',
        backgroundColor: '#4cbe6c',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 14
    },
    backText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 15
    },
    contentView:{
        flex: 1,
        width: '100%'
    }
})

// WebView - biblioteca para abrir conteúdo da web