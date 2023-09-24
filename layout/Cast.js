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
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Image200, cast_blank } from "../Api/Movie_api"




const Cast = ({ title, cast }) => {

    const navigation = useNavigation()
    
    const handle_click = (data) => {
        // console.log("cast_data",data)
        navigation.navigate("person",data)
    }

    return (
        <View className="my-6 space-y-3 mx-3">
            <Text className="text-white text-lg font-medium"> {title} </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                {
                    cast && cast.map((person, index) => {
                        return (


                            <TouchableOpacity key={index} className="space-y-1.5 mr-4"  onPress={()=>{handle_click(person)}}>
                                <View className="overflow-hidden rounded-full items-center h-20 w-20 border-neutral-500 border">
                                    <Image
                                        // source={require("../assets/images/chris.jpg")}
                                        source={{
                                            uri:

                                                Image200(person.profile_path) != null ? (Image200(person.profile_path)) : (cast_blank)
                                        }}
                                        className="h-24 w-20"
                                    />
                                </View>
                                <Text className="text-white text-center">{person.character.length>10 ? person.character.slice(0,10)+".." : person.character}</Text>
                                <Text className="text-neutral-400 text-center text-xs">{person.name.length>12?person.name.slice(0,12)+"..":person.name}</Text>
                            </TouchableOpacity>

                        )
                    })

                }

            </ScrollView>

        </View>
    )
}

export default Cast;
