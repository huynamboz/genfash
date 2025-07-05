import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading/Loading';
import { Text } from '@/components/atoms/Text';
import { GenerateImageApi, GetResultImageApi } from '@/services/generate';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, Image, ScrollView, Share, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, HomeIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResultGeneratedScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute();
  const { collection_id, isPublic, style, description, name } = (route.params as any) || {};
  const [jobId, setJobId] = React.useState<string | null>(collection_id);
  console.log('collection_id', collection_id);

  // fetch image GetResultImageApi, get image_url from api and push to result.urls, stop when image_url is 4 item
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  async function fetchImage(collection_id: string) {
    const timeStarted = Date.now();
    intervalRef.current = setInterval(() => {
      GetResultImageApi(collection_id)
        .then(async (res) => {
          console.log('res', res);
          if (res?.image_url) {
            setImageUrls(res.image_url);
            if (res.image_url.length >= 4) {
              clearInterval(intervalRef.current!);
              // calculate time taken to get image (in seconds)
              const timeTaken = Date.now() - timeStarted;
              console.log('Tổng thời gian từ lúc yêu cầu đến lúc hiện đủ 4 ảnh', timeTaken / 1000);
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    }, 1000);
  }

  React.useEffect(() => {
    if (jobId) {
      fetchImage(jobId);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [jobId]);

  useEffect(() => {
    async function saveToDB() {
      if (imageUrls.length === 4) {
        console.log('imageUrls', imageUrls);
        // await updateCollectionApi(collection_id, {
        //   main_image_url: imageUrls[0],
        //   description,
        //   style: style,
        //   is_public: isPublic,
        //   name: name || 'My Collection',
        // });
        // const addCollection = async (url: string) => {
        //   try {
        //     await addCollectionImageApi(collection_id, url);
        //   } catch (error) {
        //     console.log('Error adding collection:', error);
        //   }
        // };
        // imageUrls.forEach((url) => {
        //   addCollection(url);
        // });
      }
    }
    saveToDB();
  }, [imageUrls]);
  async function handleReGenerate() {
    const { collection_id, error } = await GenerateImageApi({
      prompt: description,
      selectedStyle: style,
      name: name || 'My Collection',
      isPublic: isPublic,
    });
    console.log('collection_id', collection_id);
    if (error) {
      Alert.alert('Error', error);
      return;
    }
    setJobId(collection_id);
    setImageUrls([]);
  }

  const [currentUrlIndex, setCurrentUrlIndex] = React.useState(0);

  const handleShare = () => {
    Share.share({
      message: `Check out this collection: ${name}`,
      url: imageUrls[currentUrlIndex],
    });
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-center gap-1 px-4 py-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 top-0 size-12 flex-row justify-center items-center bg-[#171327"
        >
          <ChevronLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl ">Generate Image</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          className="absolute right-0 top-0 size-12 flex-row justify-center items-center bg-[#171327"
        >
          <HomeIcon size={18} className="fill-white" />
        </TouchableOpacity>
      </View>

      <View className="flex-auto px-4">
        {/* Content */}
        <View className="flex-auto bg-gray-200 rounded-lg">
          {imageUrls[currentUrlIndex] ? (
            <Image
              source={{ uri: imageUrls[currentUrlIndex] }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          ) : (
            <View className="flex-row items-center justify-center w-full h-full">
              <Loading size={100} />
            </View>
          )}
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            {['', '', '', ''].map((url, index) => (
              <TouchableOpacity
                onPress={() => setCurrentUrlIndex(index)}
                className={`mr-2 w-[100px] h-[100px] rounded-lg overflow-hidden border-[2px] ${currentUrlIndex === index ? 'border-primary' : 'border-transparent'}`}
                key={index}
              >
                {/* <Image
                  source={{ uri: imageUrls[index] }}
                  className="w-full h-full"
                  resizeMode="cover"
                /> */}
                {imageUrls[index] ? (
                  <Image
                    source={{ uri: imageUrls[index] }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex-row items-center justify-center w-full h-full">
                    <Loading size={50} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* ReGenerate */}
        <Button
          text="ReGenerate"
          variant="primary"
          className="!bg-transparent border-primary border rounded-full mt-5"
          onPress={() => handleReGenerate()}
          iconLeftName="solar_magic_stick_3_bold"
          iconClassName="stroke-primary"
          classNameText="text-primary"
        />

        <View className="flex-row gap-2 mt-5">
          <View className="w-1/2">
            <Button
              text="Share"
              variant="secondary"
              className="w-full border border-gray-200 rounded-full"
              onPress={() => handleShare()}
              iconLeftName="solar_share_linear"
              iconClassName="!stroke-[#000]"
            />
          </View>
          <View className="w-1/2">
            <Button
              text="Download"
              variant="primary"
              className="w-full border rounded-full border-primary"
              onPress={() => navigation.navigate('CreateScreen')}
              iconLeftName="solar_download_minimalistic_linear"
              iconClassName="!stroke-white !fill-transparent"
              classNameText="text-white"
            />
          </View>
        </View>

        <Text className="mt-5 text-xs text-center ">
          Used 1 credits to generate this image.{' '}
          <Text className="text-primary">Get more credits</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export { ResultGeneratedScreen };
