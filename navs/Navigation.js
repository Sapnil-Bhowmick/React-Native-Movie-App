
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import Homescreen  from '../pages/Homescreen';
import MovieScreen from '../pages/MovieScreen';
import PersonScreen from '../pages/PersonScreen';
import SearchScreen from '../pages/SearchScreen';
import Loader from '../layout/Loader';
import Reviewscreen from '../pages/Reviewscreen';
import Search_cast_screen from '../pages/Search_cast_screen';
import Detail_review from '../pages/Detail_review';
import SplashScreen from '../pages/SplashScreen';




const Stack = createStackNavigator();
const Navigation=()=>{

  return (
    <NavigationContainer initialRouteName="splash">
      <Stack.Navigator>
      <Stack.Screen name="splash" component={SplashScreen} options={{title: 'Home',headerShown: false}}/>
          <Stack.Screen name="home" component={Homescreen} options={{title: 'Home',headerShown: false}}/>
          <Stack.Screen name="movie" component={MovieScreen} options={{title: 'movie',headerShown: false}}/>
          <Stack.Screen name="person" component={PersonScreen} options={{title: 'movie',headerShown: false}}/>
          <Stack.Screen name="search" component={SearchScreen} options={{title: 'movie',headerShown: false}}/>
          <Stack.Screen name="loading" component={Loader} options={{title: 'movie',headerShown: false}}/>
          <Stack.Screen name="reviews" component={Reviewscreen} options={{title: 'movie',headerShown: false}}/>
          <Stack.Screen name="search_cast" component={Search_cast_screen} options={{title: 'movie',headerShown: false}}/>
          <Stack.Screen name="movie_review" component={Detail_review} options={{title: 'movie',headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;