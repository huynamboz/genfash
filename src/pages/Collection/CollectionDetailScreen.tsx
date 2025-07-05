import { Avatar } from '@/components/atoms/Avatar';
import { getCollectionDetailApi, updateCollectionApi } from '@/services/collections';
import { CollectionDetail } from '@/types/collection';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CalendarIcon, ChevronLeftIcon, EyeIcon, ShareIcon } from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';

const CollectionDetailScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [data, setData] = useState<CollectionDetail | null>(null);
  const { collection_id } = useRoute().params as { collection_id: string };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCollectionDetailApi(collection_id);
      setData(res as CollectionDetail);
      console.log('res', res);
      if (res) {
        updateCollectionApi(collection_id, {
          view: ((res as CollectionDetail)?.collection.view || 0) + 1,
        });
      }
    };
    fetchData();
  }, [collection_id]);

  // Mock data - would come from props or API
  const post = {
    id: 1,
    title: 'Winter style for women 2020s',
    description:
      "A beautiful collection of winter fashion styles. This collection showcases the latest trends in women's winter fashion for the 2020s. From cozy sweaters to stylish coats, this collection has it all. Perfect for staying warm and fashionable during the colder months.",
    image:
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    user: {
      id: 1,
      name: 'Alex Chen',
      username: '@alexchen_dev',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
      followers: '12',
    },
    stats: {
      likes: 1247,
      comments: 89,
      views: 15,
      saves: 234,
    },
    tags: ['fashion', '2020s', 'landscape', 'women', 'winter'],
    createdAt: '2025-01-15',
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleShare = () => {
    Share.share({
      message: `Check out this collection: ${data?.collection.name}`,
      url: data?.collection.main_image_url,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="absolute left-0 right-0 z-10 flex-row items-center justify-between px-6 top-12">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="items-center justify-center w-10 h-10 rounded-full shadow-sm bg-white/90 backdrop-blur"
          >
            <ChevronLeftIcon size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Primary Image */}
        <View className="relative">
          <Image
            source={{ uri: data?.collection.main_image_url }}
            className="w-full h-80"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.1)']}
            className="absolute bottom-0 left-0 right-0 h-20"
          />
        </View>

        {/* Content */}
        <View className="px-6 py-6 bg-white">
          {/* User Info */}
          <View className="flex-row items-center mb-6">
            {/* <Image
              source={{ uri: data?.collection.publisher.avatar }}
              className="w-12 h-12 rounded-full"
            /> */}
            <Avatar url={data?.collection.publisher.avatar} className="w-12 h-12 rounded-full" />
            <View className="flex-1 ml-3">
              <View className="flex-row items-center">
                <Text className="text-base font-semibold text-gray-900">
                  {data?.collection.publisher.name}
                </Text>
              </View>
              <Text className="text-sm text-gray-600">{post.user.username}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateScreen', {
                  prompt: data?.collection.description || '',
                })
              }
              className="px-6 py-2 bg-blue-600 rounded-full shadow-sm"
            >
              <Text className="text-sm font-medium text-white">Use this prompt</Text>
            </TouchableOpacity>
          </View>

          {/* Post Title */}
          <Text className="mb-3 text-xl font-bold text-gray-900">{data?.collection.name}</Text>

          {/* Stats Row */}
          <View className="flex-row items-center gap-6 mb-4">
            <View className="flex-row items-center">
              <EyeIcon size={16} color="#6b7280" />
              <Text className="ml-1 text-sm text-gray-600">
                {formatNumber(data?.collection.view || 0)} views
              </Text>
            </View>
            <View className="flex-row items-center">
              <CalendarIcon size={16} color="#6b7280" />
              <Text className="ml-1 text-sm text-gray-600">
                {new Date(data?.collection.created_at || '').toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row items-center justify-center px-4 py-4 mb-6 border-gray-200 border-y">
            {/* <TouchableOpacity onPress={handleLike} className="flex-row items-center">
              {isLiked ? (
                <HeartSolidIcon size={24} color="#ef4444" />
              ) : (
                <HeartIcon size={24} color="#6b7280" />
              )}
              <Text className={`ml-2 text-sm ${isLiked ? 'text-red-500' : 'text-gray-600'}`}>
                {formatNumber(post.stats.likes + (isLiked ? 1 : 0))}
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={handleShare} className="flex-row items-center">
              <ShareIcon size={24} color="#6b7280" />
              <Text className="ml-2 text-sm text-gray-600">Share</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={handleSave} className="flex-row items-center">
              {isSaved ? (
                <BookmarkSolidIcon size={24} color="#3b82f6" />
              ) : (
                <BookmarkIcon size={24} color="#6b7280" />
              )}
              <Text className={`ml-2 text-sm ${isSaved ? 'text-blue-600' : 'text-gray-600'}`}>
                {formatNumber(post.stats.saves + (isSaved ? 1 : 0))}
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-base leading-6 text-gray-700">
              {showFullDescription
                ? data?.collection.description
                : `${data?.collection.description.substring(0, 150)}...`}
            </Text>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              className="mt-2"
            >
              <Text className="text-sm font-medium text-blue-600">
                {showFullDescription ? 'Show less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tags */}
          {/* <View className="mb-8">
            <View className="flex-row items-center mb-3">
              <TagIcon size={16} color="#6b7280" />
              <Text className="ml-2 text-sm text-gray-600">Tags</Text>
            </View>
            <View className="flex-row flex-wrap">
              {post.tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full mr-2 mb-2"
                >
                  <Text className="text-sm text-blue-600">#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}

          {/* Related Section */}
          <View>
            <Text className="mb-4 text-lg font-semibold text-gray-900">
              Another in this collection of {data?.collection.publisher.name}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data?.images.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CollectionDetailScreen', {
                      collection_id: item.collection_id,
                    });
                  }}
                  key={index}
                  className="w-40 mr-4"
                >
                  <Image
                    source={{
                      uri: item.image_url,
                    }}
                    className="w-40 shadow-sm h-28 rounded-xl"
                  />
                  {/* <Text className="mt-2 text-sm font-medium text-gray-900" numberOfLines={2}>
                    Another Amazing Project #{index + 1}
                  </Text> */}
                  {/* <Text className="mt-1 text-xs text-gray-500">
                    {formatNumber(Math.floor(Math.random() * 5000))} views
                  </Text> */}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export { CollectionDetailScreen };
