import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Button,
	Pressable,
} from "react-native";
import { BlogFormProps } from "../types/blogPost";

const BlogPostForm = ({
	buttonTitle,
	initialTitle = "",
	initialContent = "",
	disabled = false,
	onSubmit,
}: BlogFormProps) => {
	const [title, setTitle] = useState(initialTitle);
	const [content, setContent] = useState(initialContent);
	return (
		<View>
			<Text className="text-[20px] ml-[15px]">Enter Title</Text>
			<TextInput
				className="border-black border-2 p-[5px] m-[15px]"
				value={title}
				onChangeText={setTitle}
			/>
			<Text className="text-[20px] ml-[15px]">Enter Content</Text>
			<TextInput
				className="border-black border-2 p-[5px] m-[15px]"
				value={content}
				onChangeText={setContent}
			/>
			<Pressable
				onPress={() => onSubmit(title, content)}
				disabled={disabled}
				className=""
			>
				<Text className="text-blue-600 text-center">{buttonTitle}</Text>
			</Pressable>
		</View>
	);
};

export default BlogPostForm;
