import { BottomTab } from '@/components/atoms/BottomTab';
import { SVGIcon } from '@/components/atoms/Icon';
import Text from '@/components/atoms/Text';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const tab = ['All', 'Trending', "90's", '2000s', '2010s', '2020s'];
  const [currentTab, setCurrentTab] = React.useState('All');
  const imageURLs = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1695575576052-7c271876b075?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  // Header component cho FlatList
  const renderHeader = () => (
    <View>
      {/* Header */}
      <View className="flex-row items-center justify-center gap-1 px-4 py-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute -left-3 top-0 size-12 flex-row justify-center items-center bg-[#171327"
        >
          <SVGIcon name="solar_list_linear" className="stroke-white" />
        </TouchableOpacity>
        <SVGIcon name="solar_magic_stick_3_bold" className="fill-white" />
        <Text className="text-xl font-semibold text-white">GENFASH</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute -right-0 top-2 py-2 px-3 rounded-full flex-row gap-1 bg-gray-900 justify-center items-center bg-[#171327"
        >
          <Text>50</Text>
          <Text className="-mt-2">👑</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text className="text-white text-3xl mt-8 max-w-[80%]">
        Generate your own fashion in <Text className="font-bold">Click</Text>
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateScreen')}
        className="h-[130px] mt-5"
      >
        <LinearGradient
          useAngle={true}
          angle={60}
          colors={['#8634f9', '#5020d2', '#9b23a8', '#dc8d3c']}
          style={styles.linearGradient}
        />
        <View className="absolute w-full h-full top-0 left-0 gap-1 flex-row justify-center items-center">
          <SVGIcon name="solar_magic_stick_3_bold" className="fill-white" />
          <Text className="text-lg font-medium text-white">Generate fashion style</Text>
        </View>
      </TouchableOpacity>

      <Text className="text-white text-xl mt-6 max-w-[80%]">
        Explore this week&apos;s trending fashion styles.
      </Text>

      <ScrollView horizontal className="my-5">
        {tab.map((item, index) => (
          <TouchableOpacity
            onPress={() => setCurrentTab(item)}
            key={index}
            className={`bg-[#0c081c] h-[40px] rounded-full px-4 flex-row items-center ${currentTab === item ? 'bg-[#8634f9]' : ''}`}
          >
            <Text className="text-white text-lg font-medium">{item}</Text>
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
          data={imageURLs}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Hiển thị 2 cột
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Căn đều khoảng cách giữa các cột
          renderItem={({ item }) => (
            <View className="w-[48%] h-[250px] rounded-lg overflow-hidden mb-4">
              <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
            </View>
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
