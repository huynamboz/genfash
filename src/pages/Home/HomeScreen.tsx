import { Avatar } from '@/components/atoms/Avatar';
import { BottomTab } from '@/components/atoms/BottomTab';
import { SVGIcon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { useAuthStore } from '@/stores/auth';
import { useCollectionStore } from '@/stores/collections';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Bars3BottomLeftIcon, ShareIcon } from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const tab = ['All', '90s', '2000s', '2020s'];
  const [currentTab, setCurrentTab] = React.useState('All');
  const { fetchCollections, collections } = useCollectionStore();
  const { session } = useAuthStore();

  useEffect(() => {
    fetchCollections();
  }, []);

  const imagesFilteredByTab = useMemo(() => {
    if (currentTab === 'All') {
      return collections;
    }
    return collections.filter((item) => item.style === currentTab);
  }, [currentTab, collections]);

  // Handle create fashion
  const handleCreate = () => {
    if (!session) {
      navigation.navigate('SignInScreen');
      return;
    }
    navigation.navigate('CreateScreen');
  };

  // Header component cho FlatList
  const renderHeader = () => (
    <View>
      {/* Header */}
      <View className="flex-row items-center justify-center gap-1 px-4 py-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-0 flex-row items-center justify-center -left-3 size-12"
        >
          <Bars3BottomLeftIcon size={20} color="#374151" />
        </TouchableOpacity>
        <SVGIcon name="solar_magic_stick_3_bold" className="fill-black" />
        <Text className="text-xl font-semibold ">GENFASH</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute -right-0 top-2 py-2 px-3 rounded-full flex-row gap-1 bg-gray-200 justify-center items-center bg-[#171327"
        >
          <Text>50</Text>
          <Text className="-mt-2">👑</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text className=" text-3xl mt-8 max-w-[80%]">
        Generate your own fashion in <Text className="font-bold">Click</Text>
      </Text>
      <TouchableOpacity onPress={() => handleCreate()} className="h-[130px] mt-5">
        <LinearGradient
          useAngle={true}
          angle={60}
          colors={['#8634f9', '#5020d2', '#9b23a8', '#dc8d3c']}
          style={styles.linearGradient}
        />
        <View className="absolute top-0 left-0 flex-row items-center justify-center w-full h-full gap-1">
          <SVGIcon name="solar_magic_stick_3_bold" className="fill-white" />
          <Text className="text-lg font-medium text-white">Generate fashion style</Text>
        </View>
      </TouchableOpacity>

      <Text className=" text-xl mt-6 max-w-[80%]">
        Explore this week&apos;s trending fashion styles.
      </Text>

      <ScrollView horizontal className="my-5">
        {tab.map((item, index) => (
          <TouchableOpacity
            onPress={() => setCurrentTab(item)}
            key={index}
            className={`h-[40px] rounded-full px-4 flex-row items-center ${currentTab === item ? 'bg-[#8634f9]' : ''}`}
          >
            <Text
              className={`text-lg font-medium ${currentTab === item ? 'text-white' : 'text-black'}`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View className="flex-1">
      {/* BottomTab */}
      <BottomTab />
      <SafeAreaView edges={['top', 'right', 'left']} className="flex-1 px-4">
        <FlatList
          data={imagesFilteredByTab}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Hiển thị 2 cột
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Căn đều khoảng cách giữa các cột
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CollectionDetailScreen', { collectionId: item.id })
              }
              className="w-[48%]"
            >
              <ImageBackground
                source={{ uri: item.image }}
                className="w-full h-[250px] rounded-lg overflow-hidden mb-4"
              >
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
                  style={{ borderRadius: 8, flex: 1 }}
                />
                <View className="absolute top-0 left-0 flex-row items-end justify-end flex-1 p-4 size-full">
                  <TouchableOpacity
                    onPress={() => {}}
                    className="absolute flex-row items-center justify-center bg-gray-200 rounded-lg top-2 size-8 right-2"
                  >
                    <ShareIcon size={16} color="#374151" />
                  </TouchableOpacity>
                  <View className="flex-row items-center w-full gap-2">
                    <Avatar url={item.publisher.avatar} />
                    <Text className="text-white">{item.publisher.name}</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          ListHeaderComponent={renderHeader} // Phần header
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: 130,
    borderRadius: 20,
  },
});

export { HomeScreen };
