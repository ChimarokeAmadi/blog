export type BlogPost = {
	id: number;
	title: string;
	content: string;
};

export type Action = {
	type: ActionType;
	payload: Payload;
};

export type BlogReducer = (
	state: State,
	action: Action
) => {
	id: number;
	title: any;
	content: any;
}[];

export type BlogContextType = {
	state: State;
	getBlogPosts: () => void;
	addBlogPost: (title: string, content: string, callback: () => void) => void;
	deleteBlogPost: (id: number) => void;
	editBlogPost: (
		id: number,
		newTitle: string,
		newContent: string,
		callBack: () => void
	) => void;
};

export type Payload = any;

export type State = BlogPost[];

export type ActionType =
	| "add_blogPost"
	| "edit_blogPost"
	| "delete_blogPost"
	| "get_blogPosts";

export type Dispatch = (arg0: { type: ActionType; payload: Payload }) => void;

export type RootStackParamsList = {
	Blogs: undefined;
	Create: undefined;
	Blog: { id: number; item: BlogPost };
	Edit: { id: number };
};
