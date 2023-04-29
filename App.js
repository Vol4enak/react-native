import React from 'react'

import { useFonts } from 'expo-font'

import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'

import Main from './components/Main'
import { getAuth } from 'firebase/auth'
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from 'react-native'

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<Provider store={store}>
			<PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
				<Main />
			</PersistGate>
		</Provider>
	)
}
