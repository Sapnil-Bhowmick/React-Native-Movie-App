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
import { Image500, Image200, blank_poster } from "../Api/Movie_api"
import No_similar_movies from "./No_similar_movies";
// import {useNavigate} from "react"


// const route = useRoute()
const { height, width } = Dimensions.get('window');


const MovieList = ({ title, data, see_all, score }) => {

    const [movies, setMovies] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        //    console.log("movie_screen_data",data)

    }, [data]

    )

    const handleclick = (item) => {
        navigation.push("movie", item)
        // console.log('item', item)
    }

    return (

        <>

            <View className="mt-8 space-y-3">
                <View className='flex-row justify-between mx-3'>

                    <Text className="text-amber-300 text-bold text-sm ">{title}</Text>
                    <TouchableOpacity>
                        {
                            see_all && (<Text className='text-yellow-400 text-base'>See All</Text>)
                        }

                    </TouchableOpacity>

                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>


                    
                    { 
                    
                    data.length>0 &&
                        data.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => handleclick(item)}>
                                    <View className="m-2">
                                        <Image source={{
                                            uri:

                                                Image200(item.poster_path) != null ? (Image200(item.poster_path)) : (blank_poster)
                                        }}
                                            style={{ height: height * 0.24, width: width * 0.35 }}
                                            className="rounded-2xl" />
                                        {
                                            score ? (
                                                <View
                                                    className="overflow-hidden rounded-full items-center h-12 w-12 border-neutral-500 border bg-neutral-800 
                                                flex-row justify-center items-center -mt-5"
                                                >
                                                    <Text className="text-yellow-400 font-bold text-center">{item?.vote_average*10 + " %"} </Text>
                                                </View>
                                            ) : null
                                        }

                                        <Text className='text-white text-center pt-1'>{item.title.length > 15 ? item.title.slice(0, 15) + ".." : item.title}</Text>
                                    </View>

                                </TouchableWithoutFeedback>
                            )
                        }
                        )

                    }

                   {/* {
                    data.length===0 && (<No_similar_movies/>)
                   } */}





                </ScrollView>

            </View>




        </>
    );
}


export default MovieList;