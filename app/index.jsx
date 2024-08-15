import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Link,Redirect,router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

const App =() => {
  const {isLoading, isLoggedIn} =useGlobalContext();

  if(!isLoading &&  isLoggedIn) return <Redirect href = "/home" />
  return (
    <SafeAreaView className = "bg-primary h-full">
      <ScrollView contentContainerStyle ={{height :'100%' }}>
      
        <View className = "w-full justify-center items-center h-full px-4">
          <Image 
          source = {images.logo}
          className = "w-[130px] h-[84px]"
          resizeMode="contain"
          />
          <Image 
          source = {images.cards}
          className = "max-w-[380px] w-full h-[300px]"
          resizeMode="contain"
          />
          <View className="relative mt-5">
          <Text className="text-3xl text-white font-bold text-center">
            Discover Endless{"\n"}
            Possibilities with{" "}
            <Text className="text-secondary-200">Aora</Text>
          </Text>

          <Image
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode="contain"
          />
        </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
      <CustomButton
      title="Continue with Email"
      handlePress = { () =>router.push('/sign-in')}
      containerStyles = "w-full mt-7"
      />
      </View>
      
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>

    </SafeAreaView>
  );
}

export default   App;


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { Link } from 'expo-router';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Let's see whats gonna happen with  divyansh referal!</Text>
//       <StatusBar style="auto" />
//       <Link href = "/profile" style={{color: 'blue'}}>Profilee</Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
