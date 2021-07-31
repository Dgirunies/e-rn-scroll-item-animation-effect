import React from "react";
import {
	StatusBar,
	Image,
	Animated,
	Text,
	View,
	Dimensions,
	StyleSheet,
} from "react-native";
import faker from "faker";

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
	return {
		key: faker.datatype.uuid(),
		image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
			"women",
			"men",
		])}/${faker.datatype.number(60)}.jpg`,
		name: faker.name.findName(),
		jobTitle: faker.name.jobTitle(),
		email: faker.internet.email(),
	};
});

export default function App() {
	const scrollY = React.useRef(new Animated.Value(0)).current;

	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			<Image
				source={require("./images/banckground.jpg")}
				style={StyleSheet.absoluteFillObject}
				blurRadius={80}
			/>
			<Animated.FlatList
				data={DATA}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				keyExtractor={(item) => item.key}
				contentContainerStyle={{
					padding: SPACING,
					paddingTop: StatusBar.currentHeight || 42,
				}}
				renderItem={({ item, index }) => {
					const inputRange = [
						-1,
						0,
						ITEM_SIZE * index,
						ITEM_SIZE * (index + 2),
					];
					const opacityInputRange = [
						-1,
						0,
						ITEM_SIZE * index,
						ITEM_SIZE * (index + 0.5),
					];

					const scale = scrollY.interpolate({
						inputRange,
						outputRange: [1, 1, 1, 0],
					});
					const opacity = scrollY.interpolate({
						inputRange: opacityInputRange,
						outputRange: [1, 1, 1, 0],
					});

					return (
						<Animated.View
							style={{
								flexDirection: "row",
								padding: SPACING,
								marginBottom: SPACING,
								backgroundColor: "rgba(255,255,255,0.7)",
								borderRadius: 12,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 10,
								},
								shadowOpacity: 0.3,
								shadowRadius: 20,
								opacity,
								transform: [{ scale }],
							}}
						>
							<Image
								source={require("./images/profile.jpg")}
								style={{
									width: AVATAR_SIZE,
									height: AVATAR_SIZE,
									borderRadius: AVATAR_SIZE,
									marginRight: SPACING / 2,
								}}
							/>
							<View>
								<Text style={{ fontSize: 22, fontWeight: "700" }}>
									{item.name}
								</Text>
								<Text style={{ fontSize: 18, opacity: 0.7 }}>
									{item.jobTitle}
								</Text>
								<Text style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}>
									{item.email}
								</Text>
							</View>
						</Animated.View>
					);
				}}
			/>
		</View>
	);
}
