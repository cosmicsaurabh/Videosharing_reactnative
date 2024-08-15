import { Image,View, Text, ScrollView, Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from'../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

import { useGlobalContext } from '../../context/GlobalProvider';

const signUp = () => {
  const {setUser ,setIsLoggedIn}  =useGlobalContext();
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [form, setForm]= useState({
    username: '',
    email: '',
    password: ''
  })

  const submit = async()=>{
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try{
      const result = await createUser(form.email, form.password, form.username)
      setUser(result);
      setIsLoggedIn(true);
      //set it to global state using context
      router.replace('/home')
    }
    catch(error){
      Alert.alert('Error', error.message)
    }
    finally{
      setIsSubmitting(false);
    }
    createUser();
  }
  return (
    <SafeAreaView className = "bg-primary h-full">
      <ScrollView>
        <View className = "w-full justify-center min-h-[90vh] px-3 my-6">
          <Image source = {images.logo}
          resizeMode = 'contain' className = "w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
          Sign up into this world!
          </Text>

          <FormField
          title = "Username"
          value = {form.username}
          handleChangeText = { (e) => setForm({...form,username:e})}
          otherStyles = "mt-7"
          keyboardType = "username"
          />
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
      title = "Sign up"
      handlePress = {submit}
      containerStyles = "mt-7"
      isLoading  = {isSubmitting}
      />
      <View className = "justify-center pt-5 flex-row gap-2">
        {/* <Text className = "text-lg text-gray-100 font-regular">
          Make an account and all set 
          !!!
        </Text> */}
        <Text className = "text-lg text-gray-100 font-regular">
          Have an account already ?
        </Text> 
        <Link href = "./sign-in" 
        className='text-lg font-psemibold text-secondary'>
            Login
        </Link>
        

      </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default signUp