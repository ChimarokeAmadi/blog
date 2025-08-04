import { useContext, createContext, Children } from "react";
import { fetchBlogPosts } from "../api/fetchBlogPosts";
import { BlogPost, State } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBlogPosts } from "../api/createBlogPosts";
import { editBlogPosts } from "../api/editBlogPosts";

interface BlogPostContextType {
	blogPosts: State;
	isPending: boolean;
	error: unknown;
	refetchBlogPosts: () => void;
	createPost: ({ title, content }: { title: string; content: string }) => void;
	isCreating: boolean;
	editPost: ({
		newTitle,
		newContent,
		id,
	}: {
		newTitle: string | undefined;
		newContent: string | undefined;
		id: number | undefined;
	}) => void;
	isEditing: boolean;
}

const BlogPostContext = createContext<BlogPostContextType | undefined>(
	undefined
);

export const BlogPostProvider = ({
	children,
}: {
	children: React.ReactNode;
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

	const { mutate: createPost, isPending: isCreating } = useMutation({
		mutationFn: CreateBlogPosts,
		onSuccess: () => {
			queryContext.invalidateQueries({
				queryKey: ["blogPosts"],
			});
		},
	});

	const { mutate: editPost, isPending: isEditing } = useMutation({
		mutationFn: editBlogPosts,
		onSuccess: () => {
			queryContext.invalidateQueries({
				queryKey: ["blogPosts"],
			});
		},
	});

	const value: BlogPostContextType = {
		blogPosts,
		isPending,
		error,
		refetchBlogPosts,
		createPost,
		isCreating,
		editPost,
		isEditing,
	};

	return (
		<BlogPostContext.Provider value={value}>
			{children}
		</BlogPostContext.Provider>
	);
};

export const useBlogContext = () => {
	const context = useContext(BlogPostContext);
	if (!context)
		throw new Error("useBlogContext must be used within BlogProvider");
	return context;
};
