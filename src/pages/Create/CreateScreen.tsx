import { Button } from '@/components/atoms/Button';
import { FullScreenLoading } from '@/components/atoms/Loading/FullScreenLoading';
import { FashionPromptsModal } from '@/components/atoms/Modal/FashionPromptsModal';
import { Text } from '@/components/atoms/Text';
import { GenerateImageApi } from '@/services/generate';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { prompt: promptParam } = (useRoute().params || {}) as { prompt: string };
  const [prompt, setPrompt] = React.useState(promptParam || '');
  const [selectedStyle, setSelectedStyle] = React.useState('90s');
  const [selectedShape, setSelectedShape] = React.useState('Square');
  const [isShareResult, setIsShareResult] = React.useState(true);
  const [name, setName] = React.useState('');
  const [showPromptsModal, setShowPromptsModal] = React.useState(false);
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
      const { collection_id, error } = await GenerateImageApi({
        prompt: prompt,
        selectedStyle,
        name: name || 'My Collection',
        isPublic: isShareResult,
      });
      console.log('collection_id', collection_id);
      if (error) {
        Alert.alert('Error', error);
        return;
      }
      navigation.navigate('ResultGeneratedScreen', {
        collection_id: '1233',
        isPublic: isShareResult,
        style: selectedStyle,
        description: prompt || 'a street wear fashion style',
        name: name || 'My Collection',
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
          className="absolute top-0 flex-row items-center justify-center -left-2 size-12"
        >
          <ChevronLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-medium ">Generate</Text>
      </View>

      {/* name */}
      <Text className="mb-2 text-sm font-medium">Name your collection</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="p-2 text-black bg-gray-100 border border-transparent rounded-lg focus:border-primary"
        placeholder="Name your collection"
        placeholderClassName="text-[#8f36ff]"
        placeholderTextColor="#82709b"
      />

      {/* Content */}
      <Text className=" mt-5 max-w-[80%]">
        Describe your <Text className="font-bold">fashion style</Text>
      </Text>

      <View className="mt-2 p-3 border-[#8f36ff] border bg-gray-100 rounded-3xl">
        <TextInput
          value={prompt}
          multiline
          numberOfLines={4}
          onChangeText={setPrompt}
          className="text-black bg-transparent"
          placeholder="Describe your fashion style"
          placeholderClassName="text-[#8f36ff]"
          placeholderTextColor="#82709b"
        />

        <Button
          variant="primary"
          onPress={() => setShowPromptsModal(true)}
          className="rounded-full mt-5 self-start !py-2 border border-primary"
          iconLeftName="solar_magic_stick_3_bold"
          iconClassName="fill-black stroke-black"
          classNameText="text-xs text-white"
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
              className={`w-full h-[120px] bg-gray-100 border-[2px] flex-row overflow-hidden justify-center items-center rounded-xl ${selectedStyle === item.name ? 'border-[#8f36ff]' : 'border-transparent'}`}
            >
              <Image
                source={{ uri: item.url }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
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
              className={`w-full h-[80px] bg-gray-100 border flex-row justify-center items-center rounded-xl ${selectedShape === item.name ? 'border-[#8f36ff]' : 'border-transparent'}`}
            >
              <View
                className={`${item.className} ${item.name === selectedShape ? '!border-black' : ''}`}
              ></View>
            </View>
            <Text className="text-xs font-medium ">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Share your generated style */}
      <View className="flex-row items-center justify-between px-4 py-3 mt-5 mt-auto bg-gray-100 rounded-xl">
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
        classNameText="text-white"
      />
      <View>
        <Text className="mt-2 text-xs text-center ">
          <Text className="text-[#8f36ff]">Terms of Service</Text>
        </Text>
      </View>

      <FashionPromptsModal
        visible={showPromptsModal}
        onClose={() => setShowPromptsModal(false)}
        onSelectPrompt={(selectedPrompt) => setPrompt(selectedPrompt)}
      />
    </SafeAreaView>
  );
};

export { CreateScreen };
