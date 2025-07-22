import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types";

type CreateScreenProps = NativeStackScreenProps<RootStackParamsList, "Create">;

const CreateScreen = ({ navigation }: CreateScreenProps) => {
	const createContext = useContext(Context);

	if (!createContext) {
		return null;
	}

	const { addBlogPost } = createContext;

	const addPost = (title: string, content: string) => {
		addBlogPost(title, content, () => {
			return navigation.navigate("Blogs");
		});
	};

	return <BlogPostForm onSubmit={addPost} buttonTitle="Add Post" />;
};

export default CreateScreen;
