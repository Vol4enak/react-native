import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export const MapScreen = ({ route: { params } }) => {
	const { latitude, longitude } = params
	console.log(latitude, longitude)
	return (
		<View style={styles.container}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude,
					longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.015,
				}}
			>
				<Marker coordinate={{ latitude, longitude }} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
