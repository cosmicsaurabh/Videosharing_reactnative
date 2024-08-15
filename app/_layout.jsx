import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot,Stack,SplashScreen } from 'expo-router'
import "react-native-url-polyfill/auto";
import {useFonts }from 'expo-font'
SplashScreen.preventAutoHideAsync();
import GlobalProvider from '../context/GlobalProvider'

const  RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
 useEffect(() =>{
  if (error) throw error;

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
 },[fontsLoaded,error])

 if (!fontsLoaded && !error) {
  return null;
}
  return (
    <GlobalProvider>
    <Stack>
      {/* 1:26 */}
        <Stack.Screen name = "index" options = {{headerShown:false}}/>
        <Stack.Screen name = "(auth)" options = {{headerShown:false}}/>
        <Stack.Screen name = "(tabs)" options = {{headerShown:false}}/>
        <Stack.Screen name = "search/[query]" options = {{headerShown:false}}/>

    </Stack>
    </GlobalProvider>
  )
}

export default  RootLayout
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Slot,Stack } from 'expo-router'

// const  RootLayout = () => {
//   return (
//     <>
//     <Text>Header</Text>
//     <Slot />
//     <Text>Footer</Text>
//     </>
//   )
// }

// export default  RootLayout

/////////////////////////////////////////////////
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const  RootLayout = () => {
//   return (
//     <View style = {styles.container}>
//       <Text> RootLayout</Text>
//     </View>
//   )
// }

// export default  RootLayout

// const styles = StyleSheet.create({
//     container: {
//         display : 'flex',
//         flex:'1',
//         alignContent:'center',
//         alignItems: 'center'
//     }
// })