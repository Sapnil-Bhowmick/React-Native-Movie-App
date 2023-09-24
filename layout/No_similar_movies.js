import React, { useState } from "react";
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




const No_similar_movies = ({ title }) => {
  return (
    <View className=" space-y-3 flex-column justify-center mx-3">
      <View >
        <Text className="text-white text-lg font-medium">{title}</Text>
      </View>
      <View className="overflow-hidden items-center h-40 w-80 border-neutral-500 border">
        <Image  
          source={require("../assets/images/No_upcomming_movies.jpg")}
          className="h-40 w-80 "
        />
      </View>
    </View>
  )
}

export default No_similar_movies;
