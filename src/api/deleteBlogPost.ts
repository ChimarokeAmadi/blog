import { Alert } from "react-native";
import jsonServer from "./jsonServer";

export const deleteBlogPost = async (id: number) => {
	try {
		const response = await jsonServer.delete(`/blogPosts/${id.toString()}`);
	} catch (err) {
		if (err instanceof Error) {
			Alert.alert(`Error: ${err.message}`);
		} else {
			Alert.alert(`BloPost with ID: ${id} could not be deleted.`);
		}
	}
};
