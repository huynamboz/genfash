import { Button } from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { HomeNavigationProp } from '@/types/navigation';
import { Marquee } from '@animatereactnative/marquee';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const BoardingScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const imageURLs = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1695575576052-7c271876b075?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <SafeAreaView className="bg-[#0c081c] flex-1">
      <View className="rotate-3">
        <Marquee spacing={20} speed={1}>
          <View className="flex-row gap-4">
            {imageURLs.map((url, index) => (
              <View className="w-[200px] h-[300px] rounded-lg overflow-hidden" key={index}>
                <Image source={{ uri: url }} className="w-full h-full" resizeMode="cover" />
              </View>
            ))}
          </View>
        </Marquee>
      </View>

      <View className="mt-5 rotate-3">
        <Marquee reverse spacing={20} speed={1}>
          <View className="flex-row gap-4">
            {imageURLs.map((url, index) => (
              <View className="w-[100px] h-[100px] rounded-lg overflow-hidden" key={index}>
                <Image source={{ uri: url }} className="w-full h-full" resizeMode="cover" />
              </View>
            ))}
          </View>
        </Marquee>
      </View>

      <View className="mt-5 rotate-3">
        <Marquee spacing={20} speed={1}>
          <View className="flex-row gap-4">
            {imageURLs.map((url, index) => (
              <View className="w-[200px] h-[300px] rounded-lg overflow-hidden" key={index}>
                <Image source={{ uri: url }} className="w-full h-full" resizeMode="cover" />
              </View>
            ))}
          </View>
        </Marquee>
      </View>

      <View className="absolute bottom-0 flex-col items-center w-full pb-10">
        <LinearGradient
          colors={['rgba(1,1,1,0)', '#0c081c']}
          style={styles.linearGradient}
        ></LinearGradient>
        <View className="bg-[#0c081c] w-full flex-col gap-5 items-center justify-center">
          <Text className="text-3xl text-center ">
            Unlock your <Text className="font-bold">Creative Potential </Text>
            with AI
          </Text>

          <Text>Imagine the possibilities of AI</Text>

          <Button
            onPress={() => navigation.navigate('HomeScreen')}
            className="rounded-full"
            text="Start generate your fashion style"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: 300,
  },
});

export { BoardingScreen };
