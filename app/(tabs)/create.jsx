import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    image: null,
    prompt: "",
  });

  const [uploading, setUploading] = useState(false);

  const { user } = useGlobalContext();

  const openPicker = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      setForm({ ...form, image: res.assets[0] });
    }
  };

  const submit = async () => {
    if (!form.title || !form.prompt || !form.image)
      return Alert.alert("Please fill in all the fields");

    setUploading(true);

    try {
      await createPost({ ...form, userId: user.$id });

      Alert.alert("Success", "Post created successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Errror", error.message);
    } finally {
      setForm({ title: "", image: null, prompt: "" });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-semibold">Create Post</Text>

        <FormField
          title="Post Title"
          value={form.title}
          placeholder="Give your post a catchy title"
          handleTextChange={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Image</Text>

          <TouchableOpacity onPress={() => openPicker()}>
            {form.image ? (
              <Image
                resizeMode="cover"
                source={{ uri: form.image.uri }}
                className="w-full h-[450] rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Post Prompt"
          value={form.prompt}
          placeholder="Prompt used to create the image"
          handleTextChange={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
