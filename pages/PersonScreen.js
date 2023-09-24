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
import { HeartIcon, ArrowLeftCircleIcon } from "react-native-heroicons/solid"
import MovieList from "../layout/MovieList";
import Loader from "../layout/Loader";
import { Image500, Image300, Cast_Details, cast_blank, Cast_movie_credits } from "../Api/Movie_api"
import No_similar_movies from "../layout/No_similar_movies";


const { height, width } = Dimensions.get('window');

const PersonScreen = () => {

    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([])
    const [persondata, setPersonData] = useState({})
    const [personmovies, setPersonMoviees] = useState([])

    const previous_screen = () => {
        navigation.goBack()
    }

    useEffect(() => {

        console.log("person_screen", item)
        setLoading(true)
        person_details(item.id)
        person_movies(item.id)

    }, [item]

    )

    const person_details = async (person_id) => {

        const data = await Cast_Details(person_id)

        // console.log("person_data", data)

        if (data) {
            setPersonData(data)
        }
        else {
            setPersonData({})
        }
        setLoading(false)

    }

    const person_movies = async (person_id) => {

        const data = await Cast_movie_credits(person_id)

        console.log("person_movie_data", data.cast)

        if (data && data.cast) {
            setPersonMoviees(data.cast)
        }
        else {
            setPersonMoviees([])
        }
        setLoading(false)

    }




    return (


        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}
            className='flex-1 bg-neutral-800'
        >

            <View className="flex-row justify-between mt-4 mx-3">
                <TouchableOpacity className="rounded-xl" onPress={previous_screen}>
                    <ArrowLeftCircleIcon size='30' strokeWidth={3} color='yellow' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFavourite(!favourite)}>
                    <HeartIcon size='30' strokeWidth={3} color={favourite ? "red" : "white"} />
                </TouchableOpacity>
            </View>

            {
                loading ? (<Loader />) : (
                    <View>
                        <View className="flex-row justify-center" >

                            <View className=" flex justify-center items-center border border-white bg-neutral-900 rounded-full h-72 w-72">

                                <View className="overflow-hidden rounded-full items-center h-70 w-70 ">
                                    <Image
                                        // source={require("../assets/images/chris.jpg")} 
                                        source={{
                                            uri:

                                                Image300(persondata.profile_path) != null ? Image300(persondata.profile_path) : (cast_blank)
                                        }}
                                        style={{ height: height * 0.3, width: width * 0.62 }}
                                    />
                                </View>
                            </View>

                        </View>

                        <View className="mt-5 space-y-1">
                            <Text className="text-white font-bold text-center text-3xl tracking-tight">{persondata?.name}</Text>
                            <Text className="text-slate-400 text-center text-sm">{persondata?.place_of_birth}</Text>
                        </View>

                        <View className="flex-row justify-evenly rounded-3xl bg-neutral-700 mt-5 mx-5 p-2">
                            <View className="border-r-2 border-r-neutral-400 items-center px-2">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-400 text-center">{persondata?.gender === 2 ? "Male" : "Female"}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 items-center px-2">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-400 text-center">1997-04-12</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 items-center px-2">
                                <Text className="text-white font-semibold"> Known For</Text>
                                <Text className="text-neutral-400 text-center">{persondata?.known_for_department}</Text>
                            </View>
                            <View className="items-center px-2">
                                <Text className="text-white font-semibold"> Popularity </Text>
                                <Text className="text-neutral-400 text-center">{persondata?.popularity + " %"}</Text>
                            </View>
                        </View>

                        <View className="mx-6 my-6 space-y-5 ">
                            <Text className="text-lg  text-white">Biography</Text>
                            {
                                persondata.biography && persondata.biography.length > 0 ? (

                                    <Text className="text-white text-neutral-400 tracking-normal text-justify ">{persondata.biography}</Text>

                                ) : (

                                    <Text className="text-red-500 font-semibold tracking-normal text-justify ">No Data Found</Text>
                                )
                            }

                        </View>

                        <MovieList title="Movies" data={personmovies} see_all={false} />
                    </View>
                )
            }




        </ScrollView>
    );
}

export default PersonScreen;
