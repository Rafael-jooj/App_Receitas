import React, {useLayoutEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // useRoute permite utilizar paramentros que foram passados para a screen
import Ingredient from '../../components/Ingredient';
import Instruction from '../../components/Instruction';
import Video from '../../components/Video';

import { isFavorite, saveFavorite, removeFavorite } from '../../utils/storage'

import { Entypo, AntDesign, Feather} from '@expo/vector-icons'

export default function Detail() {

    const route = useRoute();
    const navigation = useNavigation();
    
    const [modal, setModal] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useLayoutEffect(()=>{

        async function getStatusFavorite(){
            const receipeFavorite = await isFavorite(route.params?.data);
            setFavorite(receipeFavorite)
        }

        getStatusFavorite();

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da Receita",
            headerRight: () =>(
                <Pressable onPress={() => handleSaveReceipe(route.params?.data)}>
                    {
                        favorite ? (
                        <Entypo
                            name='heart'
                            size={28}
                            color="#FF4141"
                        />
                        ) : (
                        <Entypo
                            name='heart-outlined'
                            size={28}
                            color="#FF4141"
                        />
                        )
                    }
                </Pressable>
            )
        })
    },[navigation, route.params?.data, favorite])

    async function handleSaveReceipe(receipe){

        if(favorite){
            await removeFavorite(receipe.id)
            setFavorite(false)
        }else{
            await saveFavorite(receipe)
            setFavorite(true)
        }
    }

    function handleOpenVideo(){
        setModal(true)
    }

    async function shareReceita(){
        try{
            await Share.share({
                url: "https://sujeitoprogramador.com",
                message: `Receita: ${route.params?.data.name}\n${route.params?.data.total_ingredients} Ingredientes`
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <ScrollView contentContainerStyle={{paddingBottom: 15}} style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo}>
                <View style={styles.playIcon}>
                    <AntDesign name="playcircleo" size={80} color="#fafafa" />
                </View>
                <Image style={styles.imagem} source={{uri:route.params?.data.cover}}/>
            </Pressable>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{route.params?.data.name}</Text>
                    <Text style={styles.ingredientesText}>ingredientes ({route.params?.data.total_ingredients})</Text>
                </View>
                <Pressable onPress={shareReceita}>
                    <Feather name='share-2' size={24} color="#121212"/>
                </Pressable>
            </View>

            {route.params?.data.ingredients.map((item) => (
                <Ingredient key={item.id} ingrediente={item.name} quant={item.amount}/>
            ))}

            <View style={styles.intructionArea}>
                <Text style={styles.intructionText}>Modo de Preparo</Text>
                <Feather
                    name='arrow-down'
                    size={24}
                    color={'#fff'}
                />
            </View>

            {route.params?.data.instructions.map((item)=>(
                <Instruction key={item.id} data={item}/>
            ))}

            <Modal visible={modal} animationType='slide'>
                <Video
                    handleCloseVideo={()=> setModal(false)}
                    videoUrl={route.params?.data.video}
                />
            </Modal>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingTop: 15,
        backgroundColor: '#F3F9FF',
    },
    imagem:{
        height: 200,
        width: '100%',
        borderRadius: 15,
    },
    playIcon:{
        position: 'absolute',
        zIndex: 9,
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        color: '#000'
    },
    ingredientesText:{
        marginBottom: 20
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    intructionArea:{
        backgroundColor: '#4cbe6c',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderRadius: 5,
        marginBottom: 15
    },
    intructionText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: '500'
    }
})