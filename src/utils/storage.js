import AsyncStorage from '@react-native-async-storage/async-storage'

//Buscar os favoritos
//Salvar novo favorito
//Remover um favorito da lista

export async function getFavorites(key){
    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || [];
}

export async function saveFavorite(newItem){
    let myFavorites = await getFavorites("appreceitas");
   
    let hasItem = myFavorites.some(item => item.id === newItem.id)

    if(hasItem){
        console.log("Este item já está na sua lista de favoritos")
        return;
    }
    
    myFavorites.push(newItem)

    await AsyncStorage.setItem("appreceitas", JSON.stringify(myFavorites))
    console.log("Salvo com sucesso!")
}

export async function removeFavorite(id){
    let receitas = await getFavorites("appreceitas")

    let myFavorites = receitas.filter( item => {
        return(item.id !== id)
    })

    await AsyncStorage.setItem("appreceitas", JSON.stringify(myFavorites))
    console.log("Item deletado")

    return myFavorites;
}

export async function isFavorite(receipe){
    let myreceipe = await getFavorites("appreceitas")

    const favorite = myreceipe.find(item => item.id === receipe.id)

    if(favorite){
        return true;
    }

    return false;
}