import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
import Toast from "react-native-toast-message";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex-row w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center border-2 border-black-200 space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Seach for a topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Toast.show({
              type: "error",
              text1: "Missing Query",
              text2:
                "Please provide something to search results accross database",
            });

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image className="w-5 h-5" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
