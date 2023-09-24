import React, { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon, ArrowLeftCircleIcon } from "react-native-heroicons/solid"
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
import { Image200, MoviereviewsData, cast_blank, Image50 } from "../Api/Movie_api";
import { StarIcon } from "react-native-heroicons/solid"
import Date from "../layout/Global_functions.js/Date";
import No_similar_movies from "../layout/No_similar_movies";
import { FlipInEasyX } from "react-native-reanimated";
import { findLastIndex } from "lodash";
import Loader from "../layout/Loader";



const { height, width } = Dimensions.get('window');

const Reviewscreen = () => {

    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [review, setReview] = useState([])
    
    // const desc = "Carl is a widower struggling to get back into the dating game following the death of his much loved wife. Fortunately, he has his savvy mutt Dug to help him choose his clothes and to generally get his mojo back - only this four-legged friend tends to think of things rather more in doggy terms than in human ones. It's a fun, short and sweet, glimpse at the couple and their interdependence and moves along nicely, if unremarkably, for a few minutes peppered with some enjoyable observational dialogue."

    const handle_click = (value) => {

        console.log("review", value)
        navigation.navigate("movie_review", value)

    }

    useEffect(() => {

        console.log('_reciewscreen_item_id', item)
        getMoviereviews(item)

    }, [item]

    )


    const getMoviereviews = async (id) => {
        console.log("movie_item_id", id)
        const data = await MoviereviewsData(id)

        console.log("Review_data", data.results)
        if (data && data.results) {
            setReview(data.results)

        }
        else {
            setReview([])

        }
        // setLoading(false)

    }

    const handleclick = () => {
        navigation.goBack()


        // console.log('title',item)
    }

    return (



        <View className='flex-1 bg-neutral-800'>
            <View className=" mx-3 mt-2  flex-row justify-between items-center">
                <TouchableOpacity className="rounded-xl" onPress={handleclick}>
                    <ArrowLeftCircleIcon size='30' strokeWidth={3} color='yellow' />
                </TouchableOpacity>
                <View>
                    <Text className="text-yellow-500 font-bold text-xl "> Reviews ({review.length}) </Text>
                </View>

            </View>

            

            {
                review.length > 0 ? (


                    // review.map((data, index) => {

                    // return (

                    <ScrollView horizontal={false} showsVerticalScrollIndicator={false} className="mt-7 space-y-10" >

                        {
                            review.map((data, index) => {

                                return (

                                    <View className="border-neutral-500 border space-y-7 p-6 rounded-3xl" key={index}>
                                        <View className="flex-row space-x-2">
                                            <View className="overflow-hidden bg-amber-500 flex justify-center items-center rounded-full h-20 w-20 border-black border">

                                                <Image

                                                    source={{
                                                        uri:

                                                            Image200(data.author_details.avatar_path) != null ? (Image200(data.author_details.avatar_path)) : (cast_blank)
                                                    }}

                                                    style={{ height: 40, width: 60 }}
                                                />



                                            </View>
                                            <View className="space-y-1 whitespace-normal">
                                                <Text className="text-orange-300 font-bold text-sm">Review By {data.author.length > 18 ? data.author.substring(0, 18) + ".." : data.author} </Text>
                                                <View className="bg-amber-600 rounded-full flex-row justify-center items-center h-7"
                                                    style={{ width: width * 0.3 }}>
                                                    <StarIcon size='20' strokeWidth={3} color='yellow' />
                                                    <Text className="text-black font-semibold"> Rating : {data.author_details.rating}</Text>
                                                </View>
                                                <Text className="text-white"> Wtitten by {data.author.length > 18 ? data.author.substring(0, 18) + ".." : data.author} </Text>
                                            </View>
                                        </View>



                                        <View className="space-y-2" >
                                            {/* <View style={{ borderBottomWidth: 2, borderBottomColor: "white"}}> */}
                                            <Text className="text-yellow-300 text-center"> Date : {Date(data.created_at.split("T")[0])}</Text>
                                            {/* </View> */}

                                            <Text className="text-neutral-400 text-justify"> {data.content.length > 300 ? data.content.substring(0, 300) + " ..." : data.content}</Text>
                                        </View>

                                        {
                                            data.content.length > 300 &&
                                            (
                                                <TouchableOpacity className="bg-sky-800 rounded-full h-10 flex justify-center items-center"
                                                    onPress={() => { handle_click(data) }}
                                                    style={{ marginHorizontal: width * 0.28 }}>
                                                    <Text className="text-white font-semibold"> See More </Text>
                                                </TouchableOpacity>
                                            )
                                        }



                                    </View>

                                )

                            })

                        }

                    </ScrollView>

                    // )
                    // })





                ) : (

                    // <View className="flex justify-center items-center">
                    //     <Text className="text-white text-center  "> No data </Text>
                    // </View>

                    <View  className="rounded-lg" style={{marginVertical:"50%"}}>
                        {/* <View className="flex-row justify-center ">
                            <Image source={require("../assets/images/movie_time.png")}
                                className="overflow-hidden rounded-full "
                                style={{ height: height * 0.4, width: width * 0.8 }}
                            />
                        </View> */}
                        <Text className="text-red-500 text-center font-semibold text-2xl "> Oops ! This movie have no Reviews till now </Text>
                        {/* <Text className="text-amber-500 text-center font-semibold text-xl "> Try Again !</Text> */}

                    </View> 
                )
            }







        </View>
    )
}

export default Reviewscreen
