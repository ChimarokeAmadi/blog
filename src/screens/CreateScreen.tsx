import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types";
import { useBlogContext } from "../context/BlogPostContext";

type CreateScreenProps = NativeStackScreenProps<RootStackParamsList, "Create">;

const CreateScreen = ({ navigation }: CreateScreenProps) => {
	const createContext = useBlogContext();

	if (!createContext) {
		return null;
	}

	const { createPost, isCreating } = createContext;

	const addPost = (title: string, content: string) => {
		createPost({ title, content });
		navigation.pop();
	};

	return <BlogPostForm onSubmit={addPost} buttonTitle="Add Post" />;
};

export default CreateScreen;
