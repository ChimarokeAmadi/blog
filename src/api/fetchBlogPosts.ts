import jsonServer from "./jsonServer";

export const fetchBlogPosts = async () => {
	const response = await jsonServer.get("/blogPosts");
	if (!response || !response.data) throw new Error("Failed to fetch blogPosts");
	return response.data;
};
