import { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { LoginScreen, RegisterScreen } from '../Screens/Auth'
import { HomeScreen } from '.././Screens/main/HomeScreen'

const AuthStack = createStackNavigator()

export const useRoute = authorization => {
	if (!authorization) {
		return (
			<AuthStack.Navigator>
				<AuthStack.Screen
					options={{
						headerShown: false,
					}}
					name='Login'
					component={LoginScreen}
				/>
				<AuthStack.Screen
					options={{
						headerShown: false,
					}}
					name='Registration'
					component={RegisterScreen}
				/>
			</AuthStack.Navigator>
		)
	}

	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				options={{
					headerShown: false,
				}}
				name='HomeScreen'
				component={HomeScreen}
			/>
		</AuthStack.Navigator>
	)
}
