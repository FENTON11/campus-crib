import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/Cards";

import { useAppContext } from "@/context/AppContext";
import ListHeader from "@/components/ListHeader";
import NoResults from "@/components/NoResults";
import { useEffect, useState } from "react";
import { useCustomFetch } from "@/hooks";
import { appwriteService } from "@/appwrite/appwriteService";
import { Property } from "@/typings";
import AgentsListHeader from "@/components/AgentsListHeader";
import { Link } from "expo-router";

export default function AgentProperties() {
  const { user } = useAppContext();
  const [properties, setProperties] = useState<Property[]>([]);
  const getData = async () => {
    if (!user) throw new Error("Your need to be logged in");
    return await appwriteService.getAgentProperties(user?.$id);
  };
  const { loading, data } = useCustomFetch(getData);

  useEffect(() => {
    if (data) {
      setProperties(data);
    }
  }, [data]);

  if (loading)
    return <ActivityIndicator size='large' className='text-primary-300 mt-5' />;
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card showMore {...item} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName='pb-32'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size='large' className='text-primary-300 mt-5' />
          ) : (
            <NoResults
              title='You have no property yet'
              description='once you create a property they will appear here'
            >
              <Link asChild href={"/(root)/(agents)/(tabs)/create"}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  className=' bg-primary-300 rounded-3xl p-3 m-2'
                >
                  <Text className=' font-rubik-bold  text-lg text-white'>
                    Create a property
                  </Text>
                </TouchableOpacity>
              </Link>
            </NoResults>
          )
        }
        ListHeaderComponent={<AgentsListHeader />}
      />
    </SafeAreaView>
  );
}
