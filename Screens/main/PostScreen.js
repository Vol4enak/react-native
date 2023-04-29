import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { CommentsScreen } from '../nestedScreens/CommentsScreen'
import { DefaultScreenPost } from '../nestedScreens/DefaultScreenPosts'
import { MapScreen } from '../nestedScreens/MapScreen'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../redux/auth/authOperatiom'
const NestedScreen = createStackNavigator()

export const PostScreen = ({ navigation }) => {
	const dispatch = useDispatch()

	const singOut = () => {
		dispatch(logOutUser())
	}

	return (
		<NestedScreen.Navigator>
			<NestedScreen.Screen
				name='DefaultScreen'
				component={DefaultScreenPost}
				options={{
					headerTitleAlign: 'center',
					headerRight: () => (
						<TouchableOpacity style={{ marginRight: 16 }} onPress={singOut}>
							<Ionicons name='exit-outline' size={24} color='black' />
						</TouchableOpacity>
					),
				}}
			/>
			<NestedScreen.Screen name='Map' component={MapScreen} />
			<NestedScreen.Screen name='Comments' component={CommentsScreen} />
		</NestedScreen.Navigator>
	)
}
