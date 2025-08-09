import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import { useRoute } from "@react-navigation/native";
import BlogPostForm from "../components/BlogPostForm";
import { BlogPost, Dispatch, RootStackParamsList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useBlogContext } from "../context/BlogPostContext";

type EditScreenProps = NativeStackScreenProps<RootStackParamsList, "Edit">;

const EditScreen = ({ navigation, route }: EditScreenProps) => {
	const { id } = route.params;
	const blogContext = useBlogContext();
	if (!blogContext) {
		return null;
	}
	const { blogPosts, editPost, isEditing } = blogContext;
	const blogPost = blogPosts.find((blog: BlogPost) => blog.id === id);

	// const [newTitle, setNewTitle] = useState(blogPost?.title || "");
	// const [newContent, setNewContent] = useState(blogPost?.content || "");

	// const saveEdit = (title: string, content: string) => {
	// 	editBlogPost(id, title, content, () => {
	// 		return navigation.pop();
	// 	});
	// };

	const saveEdit = (title: string, content: string) => {
		editPost({
			newTitle: title,
			newContent: content,
			id: id.toString(),
		});
		console.log(
			"New BlogPost",
			blogPost?.id,
			blogPost?.content,
			blogPost?.title
		);
		navigation.pop();
	};

	return (
		<BlogPostForm
			initialTitle={blogPost?.title}
			initialContent={blogPost?.content}
			buttonTitle="Save Edit"
			onSubmit={saveEdit}
			disabled={isEditing}
		/>
	);
};

export default EditScreen;
