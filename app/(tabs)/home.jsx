import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import   SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const{data: posts, refetch} = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  //rempved fromhere and put in custom hook
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };




  return (

    <SafeAreaView className="bg-primary h-full">


      <FlatList 
      data = {posts}
      // data= {[{id:1}, {id:2}, {id:3}]}
      // data= {[]}
      keyExtractor={(item) => item.$id}
      // renderItem={({item}) =>(
      //   <Text className="text-white text-3xl">
      //     {item.title}
      //   </Text>
      // )}
      renderItem={({item})=>(
        <VideoCard 
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
        />
      )}
      ListHeaderComponent={() =>(
        <View className = " flex my-6 px-4 space-y-6">
          <View className = "flex justify-between items-start flex-row mb-6">
            <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome !
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {/* Saurabh */}
              {/* {item.creator.username} */}
              {user?.username}
            </Text>
          </View>
          <View className="mt-1.5">
            <Image 
              source = {images.logoSmall}
              className ="w-10 h-10"
              resizeMode='contain'
            />
          </View>
        </View>
        <SearchInput />

        <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
              {/* <Trending posts = { [ {id:1}, {id:2}, {id:3}] ?? []} /> */}
            </View>
          </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos created yet"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
      
    </SafeAreaView>
  )
}

export default Home