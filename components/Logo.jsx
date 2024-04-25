import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";

const Logo = () => {
  return (
    <View className="items-center flex-row">
      <Image
        source={images.logoSmall}
        className="w-[100] h-[54]"
        resizeMode="contain"
      />
      <Text className="text-3xl font-pbold text-white">Snap</Text>
    </View>
  );
};

export default Logo;
