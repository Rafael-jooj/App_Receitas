import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import api from '../../services/api';
import FoodList from '../../components/FoodList';

export default function Search() {

    const route = useRoute();
    const [receipes, setReceipes] = useState([])

    useEffect(()=>{
        async function fecthReceipes(){
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setReceipes(response.data)
        }

        fecthReceipes();
    },[route.params?.name])

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{marginTop: 15}}
                data={receipes}
                keyExtractor={(item)=> String(item.id)}
                renderItem={({item})=> <FoodList data={item}/>}
                ListEmptyComponent={()=> <Text style={styles.aviso}>Não encontramos o que você está buscando...</Text>}
            />
        </View> 
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingTop: 15
    },
    aviso:{
        fontSize: 16
    }
})