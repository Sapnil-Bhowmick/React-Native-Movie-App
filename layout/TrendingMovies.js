import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import {useNavigation} from "@react-navigation/native";
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
    Platform, StyleSheet,TouchableWithoutFeedback
} from 'react-native';
import { Dimensions } from 'react-native';
import {Image500} from "../Api/Movie_api"


const { height, width } = Dimensions.get('window');


const MovieCard = ({item}) => {

    const navigation = useNavigation()

    const click = (item) => {
        // console.log('item',item)
        navigation.navigate("movie",item)
        
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={()=>{click(item)}}>
                <Image source={{uri:Image500(item.poster_path)}}
            style={{height:height*0.45, width:width*0.6}}
            className="rounded-3xl"
            />
            {/* <Text className='text-white'>{item.title}</Text>  */}
            </TouchableWithoutFeedback>

        </>
    );

}

const TrendingMovies = ({data}) => {

    // console.log('poster_path',data[0].title)


   

  

    


    return (
        <>
            <View className="mt-8">
                <Text className="text-white text-lg mb-5 mx-3">Trending</Text>
                <Carousel
                    data={data}
                    renderItem={({item}) => <MovieCard item={item} />}
                    firstItem={3}
                    inactiveSlideOpacity={0.5}
                    sliderWidth={width}
                    itemWidth={width * 0.62}
                    layout={"default"}
                    // enableSnap={true}
                    enableMomentum={true}
                    scrollEnabled={true}
                   
                    // sliderHeight={}
                  
                    // autoplay={true}
                    // loop={true}
                    slideStyle={{ display: 'flex', alignItems: 'center', }}
                />
            </View>

          
        </>

    );
}

export default TrendingMovies;