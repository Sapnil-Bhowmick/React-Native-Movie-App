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
import LinearGradient from 'react-native-linear-gradient';
import Cast from "../layout/Cast";
import MovieList from "../layout/MovieList";
import { Image500, MoviedetailsData, CastData, SimilarMoviesData, movie_fallback_img, Image200, blank_poster } from "../Api/Movie_api";
import Loader from "../layout/Loader";
import Release_date from "../layout/Global_functions.js/Release_date";
import No_similar_movies from "../layout/No_similar_movies";
import { MoviereviewsData } from "../Api/Movie_api";








const { height, width } = Dimensions.get('window');



const MovieScreen = () => {

    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [favourite, setFavourite] = useState(false)
    const [castdata, setCastData] = useState([])
    const [similarmovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [moviedetail, setMovieDetail] = useState({})
    const [genre, setGenre] = useState([])



    useEffect(() => {
        console.log('item_id', item.id)
        setLoading(true)
        getMoviedetails(item.id)
        cast(item.id)
        getSimilarmovies(item.id)
        // getMoviereviews(item.id)
    }, [item]

    )


    const handle_review = () => {
        navigation.navigate("reviews", item.id)
        // navigation.navigate("movie_review")

        // console.log('title',item)
    }


    const handleclick = (item) => {
        navigation.goBack()

        // console.log('title',item)
    }

    const getMoviedetails = async (id) => {

        const data = await MoviedetailsData(id)

        console.log("data", data)
        if (data) {
            setMovieDetail(data)
            setGenre(data.genres)
        }
        else {
            setMovieDetail({})
            setGenre([])
        }
        setLoading(false)

    }


    const cast = async (id) => {

        const data = await CastData(id)

        // console.log("cast_data", data)
        if (data && data.cast) {
            setCastData(data.cast)
        }
        else {
            setCastData([])
        }

    }

    const getSimilarmovies = async (id) => {

        const data = await SimilarMoviesData(id)

        // console.log("similar_movies_data", data)
        if (data && data.results) {
            setSimilarMovies(data.results)
        }
        else {
            setSimilarMovies([])
        }

    }



    return (
        <>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} className='flex-1 bg-neutral-800 w-full'>
                {/* <View className="w-full"> */}
                <View className="absolute mx-3 mt-2 z-10 flex-row justify-between ">
                    <TouchableOpacity className="rounded-xl" onPress={handleclick}>
                        <ArrowLeftCircleIcon size='30' strokeWidth={3} color='yellow' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ left: width * 0.75 }} onPress={() => setFavourite(!favourite)}>
                        <HeartIcon size='30' strokeWidth={3} color={favourite ? "red" : "white"} />
                    </TouchableOpacity>
                </View>

                {
                    loading ? (<Loader />) : (

                        <View className="overflow-hidden  items-centerbg-gradient-to-b  "

                        >
                            <Image

                                // source={{ uri: Image500(item.poster_path) }}

                                source={{
                                    uri: Image500(item.poster_path) !== null ? Image500(item.poster_path) : (blank_poster)
                                }}

                                // Image300(persondata.profile_path) != null ? Image300(persondata.profile_path) : (cast_blank)

                                style={{ width: width, height: height * 0.65 }}


                            />

                            {/* <LinearGradient 
                            // colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                            colors={['red','yellow','rgba(23,23,23,1)']}
                            style={{width:width,height:height}}
                            start={{x:0.5,y:0}}
                            end={{x:0.5,y:1}}
                            className="absolute" 
                            />  */}





                        </View>
                    )
                }



                <View className="space-y-2 mt-3">

                    <Text className="text-white font-bold text-center text-xl tracking-wide">
                        {/* Star Wars : The Mandalorian */}
                        {
                            moviedetail ? moviedetail.title : null
                        }
                    </Text>

                    <Text className="font-semibold text-neutral-400 text-sm text-center">
                        {/* Released * 2020 * 170 min */}
                        {moviedetail && moviedetail.status} *  {moviedetail && moviedetail.release_date} *  {moviedetail && moviedetail.runtime} min

                    </Text>




                    <View className="flex-row justify-center space-x-2">
                        {
                            genre.map((data, index) => {

                                let dot = index + 1

                                return (
                                    <Text className="font-semibold text-neutral-400 text-sm text-center" key={index}>

                                        {data.name} {dot !== genre.length ? "*" : null}
                                    </Text>
                                )
                            })

                        }


                    </View>

                    <View className=" mx-4 space-y-3 ">
                        <View className="flex-row justify-between">
                            <Text className="text-lg  text-white">Description</Text>
                            <View className="bg-amber-600 rounded-full px-1.5 py-0.5 ">
                                <TouchableOpacity onPress={handle_review}>
                                    <Text className="text-sm  text-white">Reviews</Text>
                                </TouchableOpacity>

                            </View>

                        </View>


                        {
                            moviedetail.overview && moviedetail.overview.length > 0 ? (

                                <Text className="text-white text-neutral-400 tracking-normal ">{moviedetail.overview}</Text>

                            ) : (

                                <Text className="text-red-500 font-semibold tracking-normal text-justify ">No Data Found</Text>
                            )
                        }



                        {/* <Text className="text-white text-neutral-400 tracking-normal ">
                            {moviedetail ? moviedetail.overview : null}
                        </Text> */}
                    </View>

                    {castdata.length > 0 && <Cast title="Top Cast" cast={castdata} />}

                    {
                        similarmovies.length > 0 ? (<MovieList title="Similar Movies" score={false} data={similarmovies} see_all={false} />) : (<No_similar_movies title="No Similar Movies" />)
                    }



                </View>


            </ScrollView>

            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}

            {/* </ScrollView> */}
        </>

    );
}

export default MovieScreen;
