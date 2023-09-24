import React, { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon, ArrowLeftCircleIcon, StarIcon } from "react-native-heroicons/solid"
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
import { MoviereviewsData, cast_blank, Image200, Image200_det_rev } from "../Api/Movie_api";
import Date from "../layout/Global_functions.js/Date";

const { height, width } = Dimensions.get('window');

const Detail_review = () => {

    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [rev_data, setRevdata] = useState({})

    useEffect(() => {

        console.log('detail_review', item.author_details.avatar_path)
        setRevdata(item)

    }, [item]

    )
    // console.log('title',item)




    const handleclick = () => {
        navigation.goBack()
    }



    return (

        //  <Text> hello </Text>


        <View className='flex-1 bg-neutral-800'>
            <View className=" mx-3 mt-2  flex-row justify-between items-center">
                <TouchableOpacity className="rounded-xl" onPress={handleclick}>
                    <ArrowLeftCircleIcon size='30' strokeWidth={3} color='yellow' />
                </TouchableOpacity>
                <View>
                    <Text className="text-yellow-500 font-bold text-xl "> Review By {rev_data.author && rev_data.author.length > 18 ? rev_data.author.substring(0, 18) + ".." : rev_data.author}</Text>
                </View>

            </View>

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} className="mt-7 space-y-10">

                <View className="border-neutral-500 border space-y-7 p-5 rounded-3xl">
                    <View className="flex-row space-x-2">
                        <View className="overflow-hidden bg-amber-500 flex justify-center items-center rounded-full h-20 w-20 border-black border">
                            {/* <Text className="text-white"> {rev_data.author_details} </Text>  */}



                            <Image

                                source={{
                                    uri: cast_blank

                                    // rev_data.author_details.avatar_path && Image200_det_rev(rev_data.author_details.avatar_path) !== null ? (Image200_det_rev(rev_data.author_details.avatar_path)) : (cast_blank)
                                }}

                                style={{ height: 40, width: 60 }}
                            />



                        </View>
                        <View className="space-y-1">
                            <Text className="text-white"> A Review By {rev_data.author && rev_data.author.length > 18 ? rev_data.author.substring(0, 18) + ".." : rev_data.author}</Text>
                            <View className="bg-amber-600 rounded-full flex-row justify-center items-center h-7"
                                style={{ width: width * 0.3 }}>
                                <StarIcon size='20' strokeWidth={3} color='yellow' />
                                <Text className="text-black font-semibold"> Rating : {rev_data.author_details && rev_data.author_details.rating ? rev_data.author_details.rating : "NA"}</Text>
                            </View>
                            <Text className="text-white"> Wtitten by {rev_data.author && rev_data.author.length > 18 ? rev_data.author.substring(0, 18) + ".." : rev_data.author}</Text>
                        </View>
                    </View>

                    <View className="space-y-3">
                        <Text className="text-yellow-300 font-bold text-center"> Date : {rev_data.created_at && rev_data.created_at.length > 0 ? Date(rev_data.created_at.split("T")[0]) : "NA"}</Text>
                        <Text className="text-orange-300 text-justify tracking-wide"> {rev_data.content} </Text>
                      

                    </View>

                </View>

            </ScrollView>




        </View>
    )
}

export default Detail_review;
