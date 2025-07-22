import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import { useRoute } from "@react-navigation/native";
import BlogPostForm from "../components/BlogPostForm";
import { BlogPost, Dispatch, RootStackParamsList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type EditScreenProps = NativeStackScreenProps<RootStackParamsList, "Edit">;

const EditScreen = ({ navigation, route }: EditScreenProps) => {
	const { id } = route.params;
	const blogContext = useContext(Context);
	if (!blogContext) {
		return null;
	}
	const { state, editBlogPost } = blogContext;
	const blogPost = state.find((blog: BlogPost) => blog.id === id);

	// const [newTitle, setNewTitle] = useState(blogPost?.title || "");
	// const [newContent, setNewContent] = useState(blogPost?.content || "");

	const saveEdit = (title: string, content: string) => {
		editBlogPost(id, title, content, () => {
			return navigation.pop();
		});
	};

	return (
		<BlogPostForm
			// title={newTitle}
			// content={newContent}
			// setTitle={setNewTitle}
			// setContent={setNewContent}
			initialTitle={blogPost?.title}
			initialContent={blogPost?.content}
			buttonTitle="Save Edit"
			onSubmit={saveEdit}
		/>
	);
};

const styles = StyleSheet.create({
	textStyles: {
		marginLeft: 5,
		fontSize: 18,
	},
	inputStyles: {
		margin: 5,
		padding: 5,
		borderWidth: 2,
	},
});
export default EditScreen;
