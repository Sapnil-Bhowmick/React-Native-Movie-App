

import React,{useEffect} from 'react';
import Navigation from './navs/Navigation';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,BackHandler,Alert
} from 'react-native';





const App = () =>  {

  useEffect(() => {

    const backAction = () => {

      console.log("Back Button Pressed")
      Alert.alert('Exit App',
      'Do you want to exit ?', [

        {
          text: "Cancel",
          onPress: () => null,
        },

        { 
          text: "Yes", 
          onPress: () => BackHandler.exitApp() 
       }

      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  }, []);
 
  return (
     <Navigation/>
  );
};



export default App;
