import React, { useContext, useEffect, useLayoutEffect } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useBlogContext } from "../context/BlogPostContext";

type IndexScreenProps = NativeStackScreenProps<RootStackParamsList, "Blogs">;

const IndexScreen = ({ navigation }: IndexScreenProps) => {
	const { blogPosts, isPending, error, refetchBlogPosts, deletePost } =
		useBlogContext();
	useEffect(() => {
		refetchBlogPosts();
		const listener = navigation.addListener("focus", () => {
			refetchBlogPosts();
		});
		return listener;
	}, []);

	return (
		<View>
			{isPending && <Text>Loading...</Text>}
			<FlatList
				data={blogPosts}
				keyExtractor={(blogPost) => blogPost.id.toString()}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Blog", { id: item.id, item });
								console.log(item);
							}}
						>
							<View style={styles.row}>
								<Text style={styles.title}>
									{item.title} - {item.id}
								</Text>
								<TouchableOpacity onPress={() => deletePost(item.id)}>
									<Feather name="trash" style={styles.icon} />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
			{error instanceof Error && (
				<Text style={{ color: "red", textAlign: "center" }}>
					{(error as Error).message}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 20,
		borderTopWidth: 1,
		paddingHorizontal: 10,
		// borderBottomWidth: 1,
		borderColor: "gray",
	},

	title: {
		fontSize: 18,
	},
	icon: {
		fontSize: 24,
	},
});
export default IndexScreen;
