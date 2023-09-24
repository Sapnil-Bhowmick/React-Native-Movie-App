import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";
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
    Platform, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { Dimensions } from 'react-native';
import TrendingMovies from "../layout/TrendingMovies";
import MovieList from "../layout/MovieList";
import { Trendingmoviesdata, Upcommingmoviesdata, Topratedmoviesdata } from "../Api/Movie_api"
import Loader from "../layout/Loader";



const { height, width } = Dimensions.get('window');

const ios = Platform.OS == 'ios'

const views1 = [
    {
        imgUrl: "https://picsum.photos/200/300?random=1",
        title: "Airport Cabs",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=3",
        title: "Gift Cards",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=5",
        title: "Hourly Stays",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=7",
        title: "Travel Insurance",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=9",
        title: "Forex",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=1",
        title: "Airport Cabs",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=3",
        title: "Gift Cards",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=5",
        title: "Hourly Stays",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=7",
        title: "Travel Insurance",
    },
    {
        imgUrl: "https://picsum.photos/200/300?random=9",
        title: "Forex",
    },
]




const Homescreen = () => {

    const navigation = useNavigation()

    const [trending, setTrending] = useState([])
    const [upcomming, setUpcomming] = useState([])
    const [toprated, setToprated] = useState([])
    const [loading, setLoading] = useState(true)

    const gettrendingmovies = async () => {

        const data = await Trendingmoviesdata();
        // console.log('got trending movies',data.results)
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }

    const getUpcommingmoviesdata = async () => {

        const data = await Upcommingmoviesdata();
        // console.log('got upcomming movies',data)
        if (data && data.results) setUpcomming(data.results)
        setLoading(false)
    }

    const getTopratedmoviesdata = async () => {

        const data = await Topratedmoviesdata();
        // console.log('got trending movies',data.results)
        if (data && data.results) setToprated(data.results)
        setLoading(false)
    }


    useEffect(() => {
        gettrendingmovies()
        getUpcommingmoviesdata()
        getTopratedmoviesdata()

    }, []

    )

    return (







        <>
            {/* <View
                style={{
                    flex: 1,
                    backgroundColor: "#f2f2f2",
                    alignItems: "center",
                    padding: 30,
                }}>
                <Carousel
                    data={views1}
                    renderItem={({item}) => <MovieCard item={item} />}
                    firstItem={1}
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
            </View> */}

            <View className='flex-1 bg-neutral-800'>
                <SafeAreaView >
                    <View className='flex-row justify-between mx-3 mt-2  items-center'>

                        <TouchableOpacity onPress={() => { navigation.navigate("search_cast") }}>
                            <Bars3CenterLeftIcon size='30' strokeWidth={2} color='yellow' />
                        </TouchableOpacity>


                        < Text className='text-white font-bold text-xl'>
                            <Text className='text-yellow-500'>M</Text>ovies
                        </Text>

                        <TouchableOpacity onPress={() => { navigation.navigate("search") }}>
                            <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>

                {
                    loading ? (<Loader />) : (
                        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                            <TrendingMovies data={trending} />
                            <MovieList title="Upcomming" score={true} data={upcomming} see_all={true} />
                            <MovieList title="Top-Rated" score={true} data={toprated} see_all={true} />
                        </ScrollView>
                    )
                }





            </View>
        </>

    );
}

export default Homescreen;