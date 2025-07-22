import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import ShowBlog from "../screens/ShowBlog";
import EditScreen from "../screens/EditScreen";
import CreateScreen from "../screens/CreateScreen";
import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { RootStackParamsList } from "../types";
const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Blogs">
				<Stack.Screen
					name="Blogs"
					component={IndexScreen}
					options={({ navigation }) => ({
						headerRight: () => (
							<TouchableOpacity onPress={() => navigation.navigate("Create")}>
								<Feather name="plus" size={30} />
							</TouchableOpacity>
						),
						headerBackVisible: false,
					})}
				/>
				<Stack.Screen name="Blog" component={ShowBlog} />
				<Stack.Screen name="Create" component={CreateScreen} />
				<Stack.Screen name="Edit" component={EditScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
