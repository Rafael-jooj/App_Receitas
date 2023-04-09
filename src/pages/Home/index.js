import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Logo from '../../components/Logo';
import FoodList from '../../components/FoodList';
import { Ionicons } from '@expo/vector-icons'
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

import { Text as MotiText} from 'moti'

export default function Home() {
    
    const [input, setInput] = useState('')
    const [foods, setFoods] = useState([])

    const navigation = useNavigation()

    useEffect(()=>{
        async function fetchApi(){
            const response = await api.get("/foods")
            setFoods(response.data)
        }

        fetchApi();

    }, []);

    function handleSearch(){
        if(!input) return;

        let inputValue = input;
        setInput('')
        navigation.navigate("Search", {name: inputValue})

    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo/>
            <MotiText 
            style={styles.title}
            from={{opacity: 0, translateY: 20}}
            animate={{opacity: 1, translateY: 0}}
            transition={{type: "timing", duration: 650}}
            >
                Encontre a receita
            </MotiText>
            <MotiText
             style={styles.title}
             from={{opacity: 0, translateY: 20}}
             animate={{opacity: 1, translateY: 0}}
             transition={{type: "timing", duration: 650}}
             >
                Que combina com você
            </MotiText>
            
            <View style={styles.campoPesquisa}>
                <TextInput 
                    placeholder='Digite o nome do prato...'
                    style={styles.input}
                    value={input}
                    onChangeText={(value) => setInput(value)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name='search' size={28} color={'#4cbe6c'}/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={foods}
                keyExtractor={(item)=> String(item.id)}
                renderItem={({item})=> <FoodList data={item}/>}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingTop: 50,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title:{
        fontSize: 26,
        fontWeight:'bold',
        color: '#0e0e0e'
    },
    campoPesquisa:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#4cbe6c',
        paddingLeft: 8,
        paddingRight: 8
    },
    input:{
        width: '90%',
        maxWidth: '90%',
        height: 50
    }
})