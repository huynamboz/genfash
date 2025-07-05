import Images from '@/assets/images';
import { Button } from '@/components/atoms/Button';
import { SVGIcon } from '@/components/atoms/Icon';
import { getMyCollectionsApi } from '@/services/collections';
import { Collection } from '@/types/collection';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const CollectionScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const data = await getMyCollectionsApi();
        if (data) {
          setCollections(data);
        }
      } catch (error) {
        console.log('Error fetching collections:', error);
      } finally {
        setIsLoading(false);
      }
    };
    setInterval(fetchCollections, 1000);
  }, []);

  const renderItem = (item: Collection) => {
    return (
      <ImageBackground
        source={{ uri: item.main_image_url }}
        className="w-[48%] mb-4 h-[200px] rounded-lg overflow-hidden relative"
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
      >
        {!item.main_image_url && (
          <View className="absolute top-0 left-0 z-50 flex-row items-center justify-center w-full h-full gap-3 bg-black-alpha-6">
            <ActivityIndicator size="small" color="#fff" />
            <Text className="text-white">Processing...</Text>
          </View>
        )}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
          style={{ borderRadius: 10, flex: 1 }}
        />
        <View className="absolute top-0 left-0 flex-col justify-end flex-1 p-4 size-full">
          <Text className="text-white" numberOfLines={2}>
            {item.description}
          </Text>
          <View className="flex-row items-center justify-between gap-2">
            <Button
              onPress={() => {
                navigation.navigate('CollectionDetailScreen', {
                  collection_id: item.id,
                });
              }}
              className="mt-2 flex-auto rounded-lg px-4 h-8 !py-0"
              classNameText="text-xs text-white"
              text="View"
            />

            <TouchableOpacity
              onPress={() => {
                Share.share({
                  message: `Check out this collection: ${item.name}`,
                  url: item.main_image_url,
                });
              }}
              className="mt-2 bg-[#171327] rounded-lg flex-row justify-center items-center px-4 h-8 py-0"
            >
              <SVGIcon name="solar_share_linear" size={16} className="stroke-white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      {/* Header */}
      <View className="flex-row items-center justify-center gap-1 py-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-0 flex-row items-center justify-center -left-2 size-12"
        >
          <ChevronLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-medium ">My Collection</Text>
      </View>

      {/* List */}
      {!isLoading && collections.length > 0 && (
        <FlatList
          data={collections}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          className="px-4 mt-5"
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Căn đều khoảng cách giữa các cột
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          numColumns={2}
        />
      )}
      {isLoading && <ActivityIndicator size="large" color="#000" />}
      {!isLoading && collections.length === 0 && (
        <View className="items-center justify-center flex-1">
          <View className="flex-col items-center justify-center gap-2">
            <Image source={Images.empty} className="w-24 h-24" />
            <Text className="text-xl font-medium ">No collections found</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export { CollectionScreen };
