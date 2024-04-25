import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const PostCard = ({
  video: {
    title,
    image,
    prompt,
    creator: { username, avatar },
  },
}) => {
//   const [showFullPrompt, setShowFullPrompt] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14 ">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[40] h-[40] rounded-full border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        {/* <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View> */}
      </View>

      <Image
        source={{ uri: image }}
        className="w-full h-[450] rounded-xl mt-3"
        resizeMode="cover"
      />

      {/* {showFullPrompt ? (
        <Text
          className="text-lg my-2 font-base text-gray-100"
          onPress={() => setShowFullPrompt(false)}
        >
          {prompt}
        </Text>
      ) : (
        <Text
          className="text-lg my-2 font-base text-gray-100 w-full"
          numberOfLines={3}
          onPress={() => setShowFullPrompt(true)}
        >
          {prompt}
        </Text>
      )} */}
    </View>
  );
};

export default PostCard;
