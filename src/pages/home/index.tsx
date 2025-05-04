import { SVGIcon } from '@/components/atoms/Icon';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const setup = require('@/assets/images/setup2.jpg');

export default function PinchToZoomCamera() {
  const tabs = [
    { name: 'text', icon: 'vuesax_text_block', color: 'fill-[#4c4c4c]', colorActive: 'fill-white' },
    {
      name: 'settings',
      icon: 'radix_mixer_horizontal',
      color: 'fill-[#4c4c4c]',
      colorActive: 'fill-white',
    },
    {
      name: 'crop',
      icon: 'hugeicons_image_crop',
      color: 'stroke-[#4c4c4c] fill-transparent',
      colorActive: 'stroke-white fill-transparent',
    },
    { name: 'layout', icon: 'layout_bottom', color: 'fill-[#4c4c4c]', colorActive: 'fill-white' },
  ];
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const image = useImage(setup);

  // Shared values cho scale (zoom)
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // Gesture pinch
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale; // Cập nhật scale dựa trên cử chỉ pinch
    })
    .onEnd(() => {
      savedScale.value = scale.value; // Lưu scale cuối cùng
      // Giới hạn scale (tùy chọn)
      if (scale.value < 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
      }
      if (scale.value > 3) {
        scale.value = withTiming(3);
        savedScale.value = 3;
      }
    });

  // Animated style cho Canvas
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleCanvasLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasSize({ width, height });
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-row p-5 justify-between">
        <SVGIcon name="camera_01" className="fill-white" />
        <SVGIcon name="x_01" className="fill-white" />
      </View>

      <View className="flex-1 p-2 overflow-hidden rounded-2xl">
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={[styles.canvasContainer, animatedStyle]}>
            {image ? (
              <Canvas style={styles.canvas} onLayout={handleCanvasLayout}>
                <Image
                  image={image}
                  x={0}
                  y={0}
                  width={canvasSize.width}
                  height={canvasSize.height}
                />
              </Canvas>
            ) : (
              <View style={styles.canvas}>
                <Text>Loading image...{canvasSize.width}</Text>
              </View>
            )}
          </Animated.View>
        </GestureDetector>
      </View>

      <View className="p-4 pb-0 flex-row justify-center">
        <View className="bg-[#1e1e1e] gap-4 flex-row items-center justify-between rounded-[26px] p-3">
          {tabs.map((tab, index) => (
            <Pressable
              key={index}
              className={`p-3 rounded-[14px] ${currentTab.name === tab.name ? 'bg-primary' : ''}`}
              onPress={() => setCurrentTab(tab)}
            >
              <SVGIcon
                name={tab.icon as any}
                className={`${currentTab.name === tab.name ? tab.colorActive : tab.color}`}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    flex: 1, // Container lấp đầy vùng cha
  },
  canvas: {
    flex: 1, // Canvas lấp đầy container
    // backgroundColor: 'red', // Để debug
  },
});
