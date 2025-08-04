export type BlogFormProps = {
	buttonTitle: string;
	initialTitle?: string | undefined;
	initialContent?: string | undefined;
	disabled?: boolean;
	onSubmit: (title: string, content: string) => void;
};
