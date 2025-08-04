import { Alert } from "react-native";
import jsonServer from "./jsonServer";

interface editBlogProps {
	newTitle: string | undefined;
	newContent: string | undefined;
	id: string | undefined;
}

export const editBlogPost = async ({
	newTitle,
	newContent,
	id,
}: editBlogProps) => {
	console.log("EDITING POST:", id, newTitle, newContent);
	console.log(typeof id);

	try {
		const response = await jsonServer.put(`/blogPosts/${id}`, {
			title: newTitle,
			content: newContent,
		});

		if (!response || !response.data)
			throw new Error("Blog could not be edited");

		return response.data;
	} catch (err) {
		if (err instanceof Error) {
			Alert.alert("Error", err.message);
		} else {
			Alert.alert("Error", "Something went wrong");
		}
	}
};
