import { Button } from '@/components/atoms/Button';
import { SVGIcon } from '@/components/atoms/Icon';
import { FullScreenLoading } from '@/components/atoms/Loading/FullScreenLoading';
import { Text } from '@/components/atoms/Text';
import { GenerateImageApi } from '@/services/generate';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [prompt, setPrompt] = React.useState('');
  const [selectedStyle, setSelectedStyle] = React.useState('90s');
  const [selectedShape, setSelectedShape] = React.useState('Square');
  const [isShareResult, setIsShareResult] = React.useState(true);
  const shape = [
    {
      name: 'Square',
      className: 'size-[30px] border-gray-600 border rounded-md',
    },
    {
      name: 'Lanscape',
      className: 'w-[30px] h-[20px] border-gray-600 border rounded-md',
    },
    {
      name: 'Portrait',
      className: 'w-[20px] h-[30px] border-gray-600 border rounded-md',
    },
    {
      name: 'Circle',
      className: 'size-[30px] border-gray-600 border rounded-full',
    },
  ];

  const fashionStyles = [
    {
      name: '90s',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: '2000s',
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: '2020s',
      url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleGenerate() {
    setIsLoading(true);
    try {
      const { job_id } = await GenerateImageApi(
        prompt + ' ' + selectedStyle || 'a street wear fashion style',
      );
      console.log('job_id', job_id);
      navigation.navigate('ResultGeneratedScreen', {
        job_id,
        isPublic: isShareResult,
        style: selectedStyle,
        description: prompt,
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 px-4">
      <FullScreenLoading isVisible={isLoading}>
        <Text className="text-lg font-medium ">Generating your fashion style...</Text>
      </FullScreenLoading>
      {/* Header */}
      <View className="flex-row items-center justify-center gap-1 py-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute -left-2 top-0 size-12 flex-row justify-center items-center bg-[#171327"
        >
          <SVGIcon name="solar_alt_arrow_left_linear" className="stroke-white" />
        </TouchableOpacity>
        <Text className="text-xl font-medium ">Prompt</Text>
      </View>

      {/* Content */}
      <Text className=" mt-5 max-w-[80%]">
        Describe your <Text className="font-bold">fashion style</Text>
      </Text>

      <View className="mt-2 p-3 border-[#8f36ff] border bg-[#1d0839] rounded-3xl">
        <TextInput
          value={prompt}
          multiline
          numberOfLines={4}
          onChangeText={setPrompt}
          className="text-white bg-transparent"
          placeholder="Describe your fashion style"
          placeholderClassName="text-[#8f36ff]"
          placeholderTextColor="#82709b"
        />

        <Button
          variant="primary"
          onPress={() => {}}
          className="rounded-full mt-5 self-start !py-2 !bg-transparent border border-primary"
          iconLeftName="solar_magic_stick_3_bold"
          classNameText="text-xs"
          text="Inspire me"
        />
      </View>

      {/* Choose style */}
      <Text className=" mt-5 max-w-[80%]">Choose your style</Text>
      <View className="flex-row gap-2 mt-2">
        {fashionStyles.map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectedStyle(item.name)}
            key={index}
            className="flex-col items-center flex-1 gap-2"
          >
            <View
              className={`w-full h-[120px] bg-[#141026] border-[2px] flex-row justify-center items-center rounded-xl ${selectedStyle === item.name ? 'border-[#8f36ff]' : 'border-transparent'}`}
            >
              <Image source={{ uri: item.url }} className="w-full h-full rounded-xl" />
            </View>
            <Text className="text-xs font-medium ">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Choose shape */}
      <Text className=" mt-5 max-w-[80%]">Choose your shape</Text>
      <View className="flex-row gap-2 mt-2">
        {shape.map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectedShape(item.name)}
            key={index}
            className="flex-col items-center flex-1 gap-2"
          >
            <View
              className={`w-full h-[80px] bg-[#141026] border flex-row justify-center items-center rounded-xl ${selectedShape === item.name ? 'border-[#8f36ff]' : 'border-transparent'}`}
            >
              <View
                className={`${item.className} ${item.name === selectedShape ? '!border-white' : ''}`}
              ></View>
            </View>
            <Text className="text-xs font-medium ">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Share your generated style */}
      <View className="flex-row items-center justify-between mt-5 bg-[#141026] px-4 py-3 rounded-xl">
        <Text className="text-xs ">Share your result!</Text>
        <Switch
          onValueChange={(value) => {
            setIsShareResult(value);
          }}
          value={isShareResult}
        />
      </View>
      <Button
        onPress={() => handleGenerate()}
        className="mt-8 rounded-full"
        iconLeftName="solar_magic_stick_3_bold"
        text="Generate fashion style"
      />
      <View>
        <Text className="mt-2 text-xs text-center ">
          Use 1 of 50 credit <Text className="text-[#8f36ff]">Terms of Service</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export { CreateScreen };
