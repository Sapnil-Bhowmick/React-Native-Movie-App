import axios, { Axios } from "axios";
import React, { useEffect, useState, useRef } from "react";

const my_api_key = "c492f3d9de80103d2224e9100a7df3c4"

const base_url = "https://api.themoviedb.org/3"

const TrendingMoviesEndpoint = base_url+"/trending/movie/day?api_key="+my_api_key
const UpcommingMoviesEndpoint = base_url+"/movie/upcoming?api_key="+my_api_key
const TopratedMoviesEndpoint =  base_url+"/movie/top_rated?api_key="+my_api_key
const SearchMoviesEndpoint =  base_url+"/search/movie?api_key="+my_api_key
const Cast_movies_endpoint =  base_url+"/search/person?api_key="+my_api_key




export const Image500 = (path) => {
    
    let img_path = path ? "https://image.tmdb.org/t/p/w500"+path : null;
    // console.log('path',img_path)
    return img_path;
}

export const Image200 = (path) => {
    
    let img_path = path ? "https://image.tmdb.org/t/p/w200"+path : null;
    // console.log('path',img_path)
    return img_path;
}


export const Image200_det_rev = (path) => {
    
    console.log("Image200_det_rev_string",path)
    let img_path = path ? "https://image.tmdb.org/t/p/w200"+path : null;
    console.log('path',img_path)
    return img_path;
}

export const Image50 = (path) => {
    
    let img_path = path ? "https://image.tmdb.org/t/p/w50"+path : null;
    // console.log('path',img_path)
    return img_path;
}

export const Image300 = (path) => {
    
    let img_path = path ? "https://image.tmdb.org/t/p/w300"+path : null;
    // console.log('path',img_path)
    return img_path;
}

export const blank_poster = "https://img.etimg.com/thumb/msid-94113283,width-650,height-488,imgsize-95364,,resizemode-75/bollywood-cinema-hall-istock.jpg"
export const cast_blank = "https://icon-library.com/images/user-image-icon/user-image-icon-19.jpg"
export const movie_fallback_img = "https://i.pinimg.com/736x/ea/8d/11/ea8d11f1ffc6355b8a440106ce61d0f3.jpg"


const apicall = async (endpoint, param) => {
    console.log('endpoint',endpoint)
    const options = {
        method: "GET",
        url: endpoint,
        params: param ? param : {}
    }

    try {
        const resp = await axios.request(options);
        console.log('response obtained')
        // console.log("resp",resp)
        return resp.data;
    }

    catch (error) {
        console.log('errror', error) 
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
    }

}

export const Trendingmoviesdata = () => {
    return apicall(TrendingMoviesEndpoint);

}

export const Upcommingmoviesdata = () => {
    return apicall(UpcommingMoviesEndpoint);
    
}

export const Topratedmoviesdata = () => {
    return apicall(TopratedMoviesEndpoint);
    
}

export const Searchmoviesdata = (search_param) => {
    return apicall(SearchMoviesEndpoint,search_param);
    
}

export const Cast_movies = (search_param) => {
    return apicall(Cast_movies_endpoint,search_param);
    
}


export const MoviedetailsData = (movie_id) => 
{
    let id = movie_id
    let movie_url = base_url+"/movie/"+id+"?api_key="+my_api_key
    console.log("movie_details_url",movie_url)
    return apicall(movie_url)
}

export const CastData = (movie_id) => 
{
    let id = movie_id
    let movie_url = base_url+"/movie/"+id+"/credits?api_key="+my_api_key
    console.log("cast_url",movie_url)
    return apicall(movie_url)
}


export const SimilarMoviesData = (movie_id) => 
{
    let id = movie_id
    let movie_url = base_url+"/movie/"+id+"/similar?api_key="+my_api_key
    console.log("Similar_movies_url",movie_url)
    return apicall(movie_url)
}

export const Cast_Details = (person_id) => 
{
    let id = person_id
    let movie_url = base_url+"/person/"+id+"?api_key="+my_api_key
    console.log("Similar_movies_url",movie_url)
    return apicall(movie_url)
}

export const Cast_movie_credits = (person_id) => 
{
    let id = person_id
    let movie_url = base_url+"/person/"+id+"/movie_credits?api_key="+my_api_key
    console.log("person_movies_url",movie_url)
    return apicall(movie_url)
}

export const MoviereviewsData = (movie_id) => 
{
    let id = movie_id
    let movie_url = base_url+"/movie/"+id+"/reviews?api_key="+my_api_key
    console.log("movie_details_url",movie_url)
    return apicall(movie_url)
}


// export const Moviedetailsdata = () => {
//     return apicall(Moviedetailsendpoint);
    
// }

// export default {Trendingmoviesdata,Upcommingmoviesdata,Topratedmoviesdata};

