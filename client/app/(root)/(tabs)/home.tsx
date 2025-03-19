import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/Cards";

import { useAppContext } from "@/context/AppContext";
import ListHeader from "@/components/ListHeader";
import NoResults from "@/components/NoResults";
import { useEffect, useState } from "react";
import { useCustomFetch } from "@/hooks";
import { appwriteService } from "@/appwrite/appwriteService";
import { Property } from "@/typings";

export default function Index() {
  const { user } = useAppContext();
  const [properties, setProperties] = useState<Property[]>([]);
  const getData = async () => {
    return await appwriteService.getProperties();
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
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName='pb-32'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size='large' className='text-primary-300 mt-5' />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  );
}
