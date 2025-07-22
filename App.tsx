import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Provider } from "./src/context/BlogContext";
import AppNavigator from "./src/components/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

export default function App() {
	const [fontsLoaded] = useFonts({
		...Feather.font,
		...Ionicons.font,
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<Provider>
				<AppNavigator />
			</Provider>
		</QueryClientProvider>
	);
}
