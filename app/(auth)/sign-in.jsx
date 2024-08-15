import { Alert,Image,View, Text, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from'../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [form, setForm]= useState({
    email: '',
    password: ''
  })
  
  const submit = async()=>{
    if(!form.email || !form.password){
      Alert.alert('Error','Please fill in details')
    }
    setIsSubmitting(true);

    try{
      await signIn(form.email,form.password)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      // Alert.alert("signed in successfull")
      //set it to global state using context

      router.replace('/home')
    }
    catch(error){
      Alert.alert('Error', error.message)
    }
    finally{
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className = "bg-primary h-full">
      <ScrollView>
        <View className = "w-full justify-center min-h-[90vh] px-3 my-6">
          <Image source = {images.logo}
          resizeMode = 'contain' className = "w-[150px] h-[150px]"
          style={{ alignSelf: 'center' }}
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
          Log in to this world !
          </Text>

          <FormField
          title = "Email"
          value = {form.email}
          handleChangeText = { (e) => setForm({...form,email:e})}
          otherStyles = "mt-7"
          keyboardType = "email-address"
          />
          <FormField
          title = "Password"
          value = {form.password}
          handleChangeText = { (e) => setForm({...form,password:e})}
          otherStyles = "mt-7"
          keyboardType = "email-address"
          />
      <CustomButton
      title = "Sign in"
      handlePress = {submit}
      containerStyles = "mt-7"
      isLoading  = {isSubmitting}
      />
      <View className = "justify-center pt-5 flex-row gap-2">
        <Text className = "text-lg text-gray-100 font-regular">
          Don't have an account ?
        </Text>
        <Link href="./sign-up" className = "text-secondary text-lg">
        Sign Up
        </Link>

      </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn