import jsonServer from "./jsonServer";

// const id = Math.floor(Math.random() * 99999);

export const CreateBlogPost = async ({
	title,
	content,
}: {
	title: string;
	content: string;
}) => {
	// const id = Math.floor(Math.random() * 99999).toString();

	const response = await jsonServer.post("/blogPosts", { title, content });

	if (!response || !response.data) {
		throw new Error("Blog was not created");
	}

	return response.data;
};
