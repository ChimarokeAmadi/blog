export type BlogFormProps = {
	buttonTitle: string;
	initialTitle?: string | undefined;
	initialContent?: string | undefined;
	onSubmit: (title: string, content: string) => void;
};
