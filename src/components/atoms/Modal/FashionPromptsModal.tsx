import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ModalBase } from './index';
import { SVGIcon } from '../Icon';
import { Text } from '../Text';

interface FashionPromptsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

const fashionPrompts = [
  {
    title: 'Streetwear',
    prompts: [
      'Urban streetwear with oversized hoodies, cargo pants, and chunky sneakers',
      'Street fashion featuring graphic tees, layered flannels, and distressed jeans',
      'Modern streetwear with bold prints, street logos, and relaxed silhouettes',
    ],
  },
  {
    title: 'Rock',
    prompts: [
      'Edgy rock look with leather jackets, ripped jeans, and band t-shirts',
      'Grunge-inspired outfit with flannel shirts, combat boots, and dark tones',
      'Glam rock style with metallic fabrics, bold makeup, and statement accessories',
    ],
  },
  {
    title: 'Summer',
    prompts: [
      'Casual summer outfit with tank tops, shorts, and sandals',
      'Beach-ready look with floral shirts, linen pants, and straw hats',
      'Lightweight summer dress with pastel colors and breezy fabrics',
    ],
  },
  {
    title: 'Winter',
    prompts: [
      'Cozy winter fashion with layered coats, scarves, and beanies',
      'Chic winter look with long trench coats, turtlenecks, and leather boots',
      'Functional winter outfit with puffer jackets, thermal wear, and snow boots',
    ],
  },
];

const FashionPromptsModal = ({ visible, onClose, onSelectPrompt }: FashionPromptsModalProps) => {
  // return (<Text>hehe</Text>)
  return (
    <ModalBase visible={visible} onPressOutside={onClose} className="max-h-[80%]">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-medium">Fashion Style Ideas</Text>
        <TouchableOpacity onPress={onClose} className="p-2">
          <SVGIcon name="chevron_left" size={24} className="fill-gray-600" />
        </TouchableOpacity>
      </View>

      <ScrollView className="max-h-[500px]">
        {fashionPrompts.map((category, index) => (
          <View key={index} className="mb-6">
            <Text className="text-lg font-medium mb-3 text-[#8f36ff]">{category.title}</Text>
            <View className="space-y-3">
              {category.prompts.map((prompt, promptIndex) => (
                <TouchableOpacity
                  key={promptIndex}
                  onPress={() => {
                    onSelectPrompt(prompt);
                    onClose();
                  }}
                  className="p-4 mb-4 bg-gray-100 border border-gray-200 rounded-xl active:bg-gray-200"
                >
                  <Text className="text-sm">{prompt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ModalBase>
  );
};

export { FashionPromptsModal };
