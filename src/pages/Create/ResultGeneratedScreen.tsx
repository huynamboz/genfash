import { Button } from '@/components/atoms/Button';
import { SVGIcon } from '@/components/atoms/Icon';
import { Loading } from '@/components/atoms/Loading/Loading';
import Text from '@/components/atoms/Text';
import { addCollectionApi } from '@/services/collections';
import { GenerateImageApi, GetResultImageApi } from '@/services/generate';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResultGeneratedScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute();
  const { job_id, isPublic, style, description } = route.params as { job_id: string };
  const [jobId, setJobId] = React.useState<string | null>(job_id);
  console.log('job_id', job_id);

  // fetch image GetResultImageApi, get image_url from api and push to result.urls, stop when image_url is 4 item
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  async function fetchImage(job_id: string) {
    const timeStarted = Date.now();
    intervalRef.current = setInterval(() => {
      GetResultImageApi(job_id)
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
    if (imageUrls.length > 0) {
      const addCollection = async (url: string) => {
        try {
          await addCollectionApi({
            image: url,
            description,
            style: style,
            is_public: isPublic,
          });
        } catch (error) {
          console.log('Error adding collection:', error);
        }
      };
      imageUrls.forEach((url) => {
        addCollection(url);
      });
    }
  }, [imageUrls]);
  async function handleReGenerate() {
    const { job_id } = await GenerateImageApi('a street wear fashion style');
    setJobId(job_id);
    setImageUrls([]);
  }

  const [currentUrlIndex, setCurrentUrlIndex] = React.useState(0);

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-center gap-1 px-4 py-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 top-0 size-12 flex-row justify-center items-center bg-[#171327"
        >
          <SVGIcon name="solar_alt_arrow_left_linear" className="stroke-white" />
        </TouchableOpacity>
        <Text className="text-xl text-white">Generate Image</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          className="absolute right-0 top-0 size-12 flex-row justify-center items-center bg-[#171327"
        >
          <SVGIcon name="solar_home_2_outline" size={18} className="fill-white" />
        </TouchableOpacity>
      </View>

      <View className="flex-auto px-4">
        {/* Content */}
        <View className="bg-gray-800 flex-auto rounded-lg">
          {imageUrls[currentUrlIndex] ? (
            <Image
              source={{ uri: imageUrls[currentUrlIndex] }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full flex-row justify-center items-center">
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
                  <View className="w-full h-full flex-row justify-center items-center">
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
          iconClassName="fill-primary"
          classNameText="text-primary"
        />

        <View className="flex-row gap-2 mt-5">
          <View className="w-1/2">
            <Button
              text="Share"
              variant="secondary"
              className="w-full border-gray-800 border rounded-full"
              onPress={() => navigation.navigate('CreateScreen')}
              iconLeftName="solar_share_linear"
              iconClassName="!stroke-white !fill-transparent"
            />
          </View>
          <View className="w-1/2">
            <Button
              text="Download"
              variant="primary"
              className="w-full border-primary border rounded-full"
              onPress={() => navigation.navigate('CreateScreen')}
              iconLeftName="solar_download_minimalistic_linear"
              iconClassName="!stroke-white !fill-transparent"
            />
          </View>
        </View>

        <Text className="text-white text-center text-xs mt-5">
          Used 1 credits to generate this image.{' '}
          <Text className="text-primary">Get more credits</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export { ResultGeneratedScreen };
