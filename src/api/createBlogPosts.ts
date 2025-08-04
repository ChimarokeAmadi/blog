import { BlogPost } from "../types";
import jsonServer from "./jsonServer";

// const id = Math.floor(Math.random() * 99999);

export const CreateBlogPosts = async ({
	title,
	content,
}: {
	title: string;
	content: string;
}) => {
	const id = Math.floor(Math.random() * 99999);

	const response = await jsonServer.post("/blogPosts", { title, content, id });

	if (!response || !response.data) {
		throw new Error("Blog was not created");
	}

	return response.data;
};
