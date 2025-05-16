import { Button } from '@/components/atoms/Button';
import { SVGIcon } from '@/components/atoms/Icon';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const CollectionScreen = () => {
  const navigation = useNavigation();
  const collections = [
    {
      id: 1,
      type: '90s',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 2,
      type: '2000s',
      images: [
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 3,
      type: '2020s',
      images: [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1695575576052-7c271876b075?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
  ];

  const renderItem = (item: any) => {
    return (
      <ImageBackground
        source={{ uri: item.images[0] }}
        className="w-[48%] mb-4 h-[200px] rounded-lg overflow-hidden relative"
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
          style={{ borderRadius: 10, flex: 1 }}
        />
        <View className="p-4 flex-1 flex-col justify-end absolute top-0 left-0 size-full">
          <Text className="text-white" numberOfLines={2}>
            A summer streetwear fashion style in the 90s
          </Text>
          <View className="flex-row items-center gap-2 justify-between">
            <Button
              onPress={() => {}}
              className="mt-2 flex-auto rounded-lg px-4 h-8 py-0"
              classNameText="text-xs"
              text="View"
            />

            <TouchableOpacity
              onPress={() => {}}
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
    <SafeAreaView>
      {/* Header */}
      {/* Header */}
      <View className="flex-row items-center justify-center gap-1 py-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute -left-2 top-0 size-12 flex-row justify-center items-center bg-[#171327"
        >
          <SVGIcon name="solar_alt_arrow_left_linear" className="stroke-white" />
        </TouchableOpacity>
        <Text className="text-xl font-medium text-white">My Collection</Text>
      </View>

      {/* List */}
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
    </SafeAreaView>
  );
};

export { CollectionScreen };
