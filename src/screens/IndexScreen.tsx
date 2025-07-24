import React, { useContext, useEffect, useLayoutEffect } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import Feather from "@expo/vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types";

type IndexScreenProps = NativeStackScreenProps<RootStackParamsList, "Blogs">;

const IndexScreen = ({ navigation }: IndexScreenProps) => {
	const IndexContext = useContext(Context);
	if (!IndexContext) {
		return null;
	}

	const { state, deleteBlogPost, getBlogPosts } = IndexContext;

	useEffect(() => {
		getBlogPosts();
	}, []);

	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => (
	// 			<TouchableOpacity onPress={() => navigation.navigate("Create")}>
	// 				<Feather name="plus" size={24} />
	// 			</TouchableOpacity>
	// 		),
	// 	});
	// }, [navigation]);

	return (
		<View>
			<FlatList
				data={state}
				keyExtractor={(blogPost) => blogPost.id.toString()}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => navigation.navigate("Blog", { id: item.id, item })}
						>
							<View style={styles.row}>
								<Text style={styles.title}>
									{item.title} - {item.id}
								</Text>
								<TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
									<Feather name="trash" style={styles.icon} />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

// IndexScreen.navigationOptions = () => {
// 	return {
// 		headerRight: () => (
// 			<TouchableOpacity onPress={() => navigation.navigate("Create")}>
// 				<Feather name="plus" size={30} />
// 			</TouchableOpacity>
// 		),
// 	};
// };

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
