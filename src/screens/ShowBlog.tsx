import React, { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Context } from "../context/BlogContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamsList } from "../types";
import { useBlogContext } from "../context/BlogPostContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamsList, "Blog">;
type RouteParams = RouteProp<RootStackParamsList, "Blog">;
const ShowBlog = () => {
	const showBlogContext = useBlogContext();

	if (!showBlogContext) {
		return <Text>null</Text>;
	}

	const { blogPosts } = showBlogContext;
	const route = useRoute<RouteParams>();
	const navigation = useNavigation<NavigationProp>();
	const { id } = route.params;
	// const { item } = route.params;
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => navigation.navigate("Edit", { id: route?.params?.id })}
				>
					<Ionicons name="pencil-outline" size={24} color="black" />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const blogPost = blogPosts.find((blogPost) => blogPost.id === id);

	return (
		<View>
			<Text style={{ fontSize: 20 }}>{blogPost?.title}</Text>
			<Text style={{ fontSize: 20 }}>{blogPost?.content}</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default ShowBlog;
