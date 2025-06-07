import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BookmarkIcon,
  CalendarIcon,
  ChatBubbleOvalLeftIcon,
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  TagIcon,
} from 'react-native-heroicons/outline';
import {
  BookmarkIcon as BookmarkSolidIcon,
  HeartIcon as HeartSolidIcon,
} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';

const CollectionDetailScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    console.log('Share post');
  };

  const handleComment = () => {
    console.log('Open comments');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="absolute left-0 right-0 z-10 flex-row items-center justify-between px-6 top-12">
          <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-sm bg-white/90 backdrop-blur">
            <ChevronLeftIcon size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-sm bg-white/90 backdrop-blur">
            <EllipsisHorizontalIcon size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Primary Image */}
        <View className="relative">
          <Image source={{ uri: post.image }} className="w-full h-80" resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.1)']}
            className="absolute bottom-0 left-0 right-0 h-20"
          />
        </View>

        {/* Content */}
        <View className="px-6 py-6 bg-white">
          {/* User Info */}
          <View className="flex-row items-center mb-6">
            <Image source={{ uri: post.user.avatar }} className="w-12 h-12 rounded-full" />
            <View className="flex-1 ml-3">
              <View className="flex-row items-center">
                <Text className="text-base font-semibold text-gray-900">{post.user.name}</Text>
              </View>
              <Text className="text-sm text-gray-600">
                {post.user.username} • {post.user.followers} followers
              </Text>
            </View>
            <TouchableOpacity className="px-6 py-2 bg-blue-600 rounded-full shadow-sm">
              <Text className="text-sm font-medium text-white">Follow</Text>
            </TouchableOpacity>
          </View>

          {/* Post Title */}
          <Text className="mb-3 text-xl font-bold text-gray-900">{post.title}</Text>

          {/* Stats Row */}
          <View className="flex-row items-center gap-6 mb-4">
            <View className="flex-row items-center">
              <EyeIcon size={16} color="#6b7280" />
              <Text className="ml-1 text-sm text-gray-600">
                {formatNumber(post.stats.views)} views
              </Text>
            </View>
            <View className="flex-row items-center">
              <CalendarIcon size={16} color="#6b7280" />
              <Text className="ml-1 text-sm text-gray-600">Jan 15, 2024</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row items-center justify-between py-4 mb-6 border-gray-200 border-y">
            <TouchableOpacity onPress={handleLike} className="flex-row items-center">
              {isLiked ? (
                <HeartSolidIcon size={24} color="#ef4444" />
              ) : (
                <HeartIcon size={24} color="#6b7280" />
              )}
              <Text className={`ml-2 text-sm ${isLiked ? 'text-red-500' : 'text-gray-600'}`}>
                {formatNumber(post.stats.likes + (isLiked ? 1 : 0))}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleComment} className="flex-row items-center">
              <ChatBubbleOvalLeftIcon size={24} color="#6b7280" />
              <Text className="ml-2 text-sm text-gray-600">
                {formatNumber(post.stats.comments)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleShare} className="flex-row items-center">
              <ShareIcon size={24} color="#6b7280" />
              <Text className="ml-2 text-sm text-gray-600">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} className="flex-row items-center">
              {isSaved ? (
                <BookmarkSolidIcon size={24} color="#3b82f6" />
              ) : (
                <BookmarkIcon size={24} color="#6b7280" />
              )}
              <Text className={`ml-2 text-sm ${isSaved ? 'text-blue-600' : 'text-gray-600'}`}>
                {formatNumber(post.stats.saves + (isSaved ? 1 : 0))}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-base leading-6 text-gray-700">
              {showFullDescription ? post.description : `${post.description.substring(0, 150)}...`}
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
          <View className="mb-8">
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
          </View>

          {/* Related Section */}
          <View>
            <Text className="mb-4 text-lg font-semibold text-gray-900">
              More from {post.user.name}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3].map((item) => (
                <TouchableOpacity key={item} className="w-40 mr-4">
                  <Image
                    source={{
                      uri: `https://images.unsplash.com/photo-155165097${item}-87deedd944c3?w=200&h=150&fit=crop`,
                    }}
                    className="w-40 shadow-sm h-28 rounded-xl"
                  />
                  <Text className="mt-2 text-sm font-medium text-gray-900" numberOfLines={2}>
                    Another Amazing Project #{item}
                  </Text>
                  <Text className="mt-1 text-xs text-gray-500">
                    {formatNumber(Math.floor(Math.random() * 5000))} views
                  </Text>
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
