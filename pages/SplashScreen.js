import React, { useEffect, useState, useRef } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Image,
    ImageBackground,
    FlatList,
    Platform, Dimensions, TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get('window');


const SplashScreen = () => {

const navigation = useNavigation()



useEffect( ()=> {
    
    console.log("I am in splash")
    var timeout = setTimeout( () => {
          navigation.navigate("home")
    },3000)

},[])






    return (
        <View className='flex-1 bg-neutral-800 items-center space-y-8 pt-40'>

            <View className="overflow-hidden rounded-lg  border-neutral-500 border ">

                <Image source={require("../assets/images/splash_img.png")}
                    style={{ height: height * 0.28, width: width * 0.55 }}
                />

            </View>
            <View className="space-y-3">
                <Text className="text-yellow-500 font-bold text-xl text-center "> Welcome to the Movie App</Text>
                <Text className="text-yellow-500 font-bold text-xl text-center "> Enjoy Favourite Movies</Text>
            </View>


        </View>
    )
}

export default SplashScreen;
