import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { BlogFormProps } from "../types/blogPost";

const BlogPostForm = ({
	// title,
	// content,
	// setTitle,
	// setContent,
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
			<Text style={styles.label}>Enter Title</Text>
			<TextInput style={styles.input} value={title} onChangeText={setTitle} />
			<Text style={styles.label}>Enter Content</Text>
			<TextInput
				style={styles.input}
				value={content}
				onChangeText={setContent}
			/>
			<Button
				title={buttonTitle}
				onPress={() => onSubmit(title, content)}
				disabled={disabled}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 2,
		padding: 5,
		margin: 15,
	},
	label: {
		fontSize: 20,
		marginLeft: 15,
	},
});
export default BlogPostForm;
