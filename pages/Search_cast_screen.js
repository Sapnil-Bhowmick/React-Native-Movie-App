import React, { useEffect, useState, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
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
    Platform, Dimensions, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline"
import Loader from "../layout/Loader";
import { Cast_movies, Image200, blank_poster } from "../Api/Movie_api"


const { height, width } = Dimensions.get('window');

const Search_cast_screen = () => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const moviename = "The ant man and the wasp, start wars"
    const [cast_movie_data, setCastMovieData] = useState([])
    // const [cast_known, setCastknown] = useState([])



    const cross_function = () => {
        navigation.navigate('home')
    }


    const handleclick = (movie) => {

        // console.log("search_moviedetails",movie)
        navigation.navigate('movie', movie)
    }


    const search_cast_movies = async (search_result) => {

        var query_param = {
            query: search_result,
            include_adult: false,
            language: "en-US",
            page: 1
        }

        const data = await Cast_movies(query_param);
        // console.log('search_cast_movies', data.results)
        if (data && data.results) {
            setCastMovieData(data.results)
            // setCastknown(data.results.known_for)
        }

        else {
            setCastMovieData([])
            // setCastknown([])
        }
        setLoading(false)
    }

    const handle_search = (value) => {

        // if (value && value.length>2) {
        setLoading(true)
        // console.log("search", value)
        search_cast_movies(value)
        // }


    }

    const handle_text_debounce = useCallback(debounce(handle_search, 400), [])

    return (


        <View className='flex-1 bg-neutral-800'>
            <View className="mt-5">
                <Text className="text-yellow-500 font-bold text-xl text-center">
                    Search Your Favourite Cast Movies
                </Text>
            </View>
            <View className="mx-3">
                <View className="border border-neutral-500 rounded-full flex-row justify-between my-5">
                    <TextInput
                        onChangeText={handle_text_debounce}
                        placeholder="Search Cast"
                        placeholderTextColor={'lightgray'}
                        className="pl-5 font-semibold flex-1 rounded-full text-yellow-500"
                    />
                    <TouchableOpacity className="rounded-full bg-neutral-500 items-center p-2.5 m-2" onPress={cross_function}>
                        <XMarkIcon size={20} strokeWidth={3} color="white" />
                    </TouchableOpacity>
                </View>

                {
                    loading ? (<Loader />) : (

                        cast_movie_data.length > 0 ? (
                            
                            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} className="space-y-4">

                                <Text className="text-white font-semibold px-4">Results ({cast_movie_data.length}) </Text>

                                <View className="flex-row flex-wrap justify-evenly">
                                    {
                                        cast_movie_data.map((movie, index) => {

                                      

                                            return (

                                               

                                                movie.known_for.map((movie_knownfor, index_knownfor) => {

                                                    return (
                                                         

                                                        <TouchableWithoutFeedback key={index_knownfor} onPress={() => { handleclick(movie_knownfor) }}>
                                                            
                                                            <View className="mb-4 space-y-2">
                                                                <Image
                                                                   
                                                                    source={{
                                                                        uri:

                                                                            Image200(movie_knownfor.poster_path) != null ? (Image200(movie_knownfor.poster_path)) : (blank_poster)
                                                                    }}
                                                                    style={{ height: height * 0.3, width: width * 0.4 }}
                                                                    className="rounded-2xl " />
                                                                <Text className="text-neutral-300 text-center">
                                                                    {movie_knownfor.title ? movie_knownfor.title.slice(0, 18) + "..." : movie_knownfor.title}
                                                                </Text>
                                                            </View>
                                                         
                                                        </TouchableWithoutFeedback>
                                                    )



                                                })



                                            )

                                        })}
                                </View>


                            </ScrollView>

                        ) : (
                            <View className="space-y-6">
                                <View className="flex-row justify-center ">
                                    <Image source={require("../assets/images/movie_time.png")}
                                        className="overflow-hidden rounded-full "
                                        style={{ height: height * 0.4, width: width * 0.8 }}
                                    />
                                </View>
                                <Text className="text-amber-200 text-center font-semibold text-2xl "> Oops !  No Movies Found </Text>
                                <Text className="text-amber-500 text-center font-semibold text-xl "> Try Again !</Text>

                            </View>

                        )

                    )
                }






            </View>


        </View>
    );
}

export default Search_cast_screen;
