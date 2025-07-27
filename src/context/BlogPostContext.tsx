import { useContext, createContext, Children } from "react";
import { fetchBlogPosts } from "../api/fetchBlogPosts";
import { State } from "../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface BlogPostContextType {
	blogPosts: State;
	isPending: boolean;
	error: unknown;
	refetchBlogPosts: () => void;
}

const BlogPostContext = createContext<BlogPostContextType | undefined>(
	undefined
);

export const BlogPostProvider = ({
	Children,
}: {
	Children: React.ReactNode;
}) => {
	const queryContext = useQueryClient();
	const {
		data: blogPosts,
		isPending,
		error,
		refetch: refetchBlogPosts,
	} = useQuery({
		queryKey: ["blogPosts"],
		queryFn: fetchBlogPosts,
	});

	const value: BlogPostContextType = {
		blogPosts,
		isPending,
		error,
		refetchBlogPosts,
	};

	return (
		<BlogPostContext.Provider value={value}>
			{Children}
		</BlogPostContext.Provider>
	);
};

export const useBlogContext = () => {
	const context = useContext(BlogPostContext);
	if (!context)
		throw new Error("useBlogContext must be used within BlogProvider");
	return context;
};
