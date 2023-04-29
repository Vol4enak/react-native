import { StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { CreatePostScreen } from './CreatePostScreen'
import { PostScreen } from './PostScreen'
import { ProfileScreen } from './ProfileScreen'

const MainStack = createBottomTabNavigator()

export const HomeScreen = ({ navigation }) => {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name='appstore-o'
							size={24}
							color='black'
							style={{
								backgroundColor: focused ? '#ff8c00' : 'transparent',
								paddingHorizontal: 20,
								paddingVertical: 6,
								borderRadius: 25,
							}}
						/>
					),
				}}
				name='Post'
				component={PostScreen}
			/>

			<MainStack.Screen
				options={{
					headerTitleAlign: 'center',
					tabBarShowLabel: false,
					title: 'Создать публикацию',
					headerTitleStyle: {
						fontWeight: 'bold',
					},

					headerLeft: () => (
						<TouchableOpacity
							style={{ marginLeft: 16 }}
							onPress={() => navigation.goBack()}
						>
							<Ionicons name='arrow-back' size={24} color='black' />
						</TouchableOpacity>
					),
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name='ios-add'
							size={24}
							color='black'
							style={{
								backgroundColor: focused ? '#ff8c00' : 'transparent',
								paddingHorizontal: 20,
								paddingVertical: 6,
								borderRadius: 25,
							}}
						/>
					),
				}}
				name='Create'
				component={CreatePostScreen}
			/>
			<MainStack.Screen
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, size, color }) => (
						<Ionicons
							name='person-outline'
							size={24}
							color='black'
							style={{
								backgroundColor: focused ? '#ff8c00' : 'transparent',
								paddingHorizontal: 20,
								paddingVertical: 6,
								borderRadius: 25,
							}}
						/>
					),
				}}
				name='Profile'
				component={ProfileScreen}
			/>
		</MainStack.Navigator>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
