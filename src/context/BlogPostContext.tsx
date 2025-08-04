import { useContext, createContext, Children } from "react";
import { fetchBlogPosts } from "../api/fetchBlogPosts";
import { BlogPost, State } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBlogPost } from "../api/createBlogPost";
import { editBlogPost } from "../api/editBlogPost";
import { deleteBlogPost } from "../api/deleteBlogPost";

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
		id: string | undefined;
	}) => void;
	isEditing: boolean;
	deletePost: (id: number) => void;
	isDeleting: boolean;
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
		// refetchInterval: 5 * 1000,
	});

	const { mutate: createPost, isPending: isCreating } = useMutation({
		mutationFn: CreateBlogPost,
		onSuccess: () => {
			queryContext.invalidateQueries({
				queryKey: ["blogPosts"],
			});
		},
	});

	const { mutate: editPost, isPending: isEditing } = useMutation({
		mutationFn: editBlogPost,
		onSuccess: () => {
			queryContext.invalidateQueries({
				queryKey: ["blogPosts"],
			});
		},
	});

	const { mutate: deletePost, isPending: isDeleting } = useMutation({
		mutationFn: deleteBlogPost,
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
		deletePost,
		isDeleting,
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
