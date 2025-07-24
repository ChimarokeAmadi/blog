import { Action, Dispatch, State, BlogContextType } from "../types";
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

// const BlogContext = React.createContext({});

const blogReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "get_blogPosts":
			return action.payload;
		case "add_blogPost":
			return [
				...state,
				{
					id: Math.floor(Math.random() * 99999),
					title: action.payload.title,
					content: action.payload.content,
				},
			];

		case "delete_blogPost":
			const newState = state.filter((blog) => blog.id !== action.payload);
			return [...newState];

		case "edit_blogPost":
			let blogPost = state.find((blog) => blog.id === action.payload.id);

			if (blogPost) {
				blogPost.title = action.payload.newTitle;
				blogPost.content = action.payload.newContent;
			}
			return [...state];

		default:
			return state;
	}
};

const getBlogPosts = (dispatch: Dispatch) => {
	return async () => {
		const response = await jsonServer.get("/blogPosts");
		if (!response || !response.data) {
			throw new Error("Failed to fetch blog posts");
		}
		console.log(response.data);
		dispatch({ type: "get_blogPosts", payload: response.data });
	};
};

const addBlogPost = (dispatch: Dispatch) => {
	return (title: string, content: string, callBack: () => void) => {
		dispatch({
			type: "add_blogPost",
			payload: { title, content },
		});
		if (callBack) {
			callBack();
		}
	};
};
const deleteBlogPost = (dispatch: Dispatch) => {
	return (id: number) => {
		dispatch({ type: "delete_blogPost", payload: id });
	};
};
const editBlogPost = (dispatch: Dispatch) => {
	return (
		id: number,
		newTitle: string,
		newContent: string,
		callBack: () => void
	) => {
		dispatch({ type: "edit_blogPost", payload: { id, newTitle, newContent } });
		if (callBack) {
			callBack();
		}
	};
};

// export const BlogProvider = ({ children }) => {
// 	const [blogPosts, dispatch] = useReducer(blogReducer, []);
// 	// const blogPosts = [{ title: "Blog post #1" }, { title: "Blog post #2" }];
// 	// const addBlogPost = () => {
// 	// 	setBlogPosts([
// 	// 		...blogPosts,
// 	// 		{ title: `Blog post # ${blogPosts.length + 1}` },
// 	// 	]);
// 	// };

// 	return (
// 		<BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
// 			{children}
// 		</BlogContext.Provider>
// 	);
// };

const { Context, Provider } = createDataContext<State, Action, BlogContextType>(
	blogReducer,
	{ addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
	[]
);

export { Context, Provider };
function async() {
	throw new Error("Function not implemented.");
}
