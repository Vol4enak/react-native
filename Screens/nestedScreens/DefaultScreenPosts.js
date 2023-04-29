import {
	collection,
	doc,
	getFirestore,
	onSnapshot,
	query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native'
import app from '../../firebase'
import { selectAuth } from '../../redux/auth/selectors'
import { useSelector } from 'react-redux'

export const DefaultScreenPost = ({ navigation }) => {
	const [posts, setPosts] = useState(null)
	const { width } = useWindowDimensions()
	const { nickname, userId } = useSelector(selectAuth)

	useEffect(() => {
		getAllPost()
	}, [])

	const getAllPost = async () => {
		try {
			const db = await getFirestore(app)
			const unsub = await onSnapshot(collection(db, 'posts'), snapshot => {
				setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
			})
		} catch (error) {
			console.log(error)
		}
	}

	const goToComments = id => {
		navigation.navigate('Comments', { postId: id })
	}

	const goToMap = location => {
		navigation.navigate('Map', location)
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={posts}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item: { locality, location, comment, photo, id } }) => (
					<View style={styles.post}>
						<View style={styles.photoContainer}>
							<Image
								source={{ uri: photo }}
								style={{
									...styles.photo,
									width: width - 34,
									height: width / 1.45,
								}}
							/>
						</View>
						<Text style={{ ...styles.text, marginBottom: 4, marginLeft: 6 }}>
							{comment}
						</Text>
						<View style={styles.bottomBox}>
							<TouchableOpacity onPress={() => goToComments(id)}>
								<FontAwesome name='comment-o' size={24} color='black' />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => goToMap(location)}>
								<Text style={styles.text}>{locality}</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 32,
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#fff',
	},
	post: {
		gap: 10,
		marginBottom: 20,
		marginHorizontal: 1,
	},
	photoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#fff',
	},
	bottomBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 6,
	},
	text: {
		fontSize: 16,
		lineHeight: 19,
		fontWeight: 500,
		color: '#000',
	},
	photo: { borderRadius: 6 },
	name: {
		fontWeight: 700,
		fontSize: 13,
		lineHeight: 15,
		color: '#212121',
	},
	email: {
		fontSize: 11,
		lineHeight: 13,
		color: 'rgba(33, 33, 33, 0.8)',
	},

	exitBtn: {
		position: 'absolute',
		top: -10,
		right: 19,
	},
})
