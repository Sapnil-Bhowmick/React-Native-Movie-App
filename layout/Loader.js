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
    Platform, StyleSheet, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const Loader = () => {
    return (
        <View className='flex-1 bg-neutral-800'>
            <View className="justify-center items-center space-y-5 " style={{ marginTop: height * 0.3 }}>
                <ActivityIndicator size={width * 0.3} color="orange" />
                {/* <Text className="text-neutral-300 text-xl"> Loading ... </Text> */}
            </View>
        </View>

    )
}

export default Loader;

