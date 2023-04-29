import {
	collection,
	getDocs,
	getFirestore,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore'

import {
	FlatList,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import app from '../../firebase'

import { selectAuth } from '../../redux/auth/selectors'

export const ProfileScreen = ({ navigation }) => {
	const { width } = useWindowDimensions()
	const { height } = useWindowDimensions()
	const { userId } = useSelector(selectAuth)
	const [userPosts, setUserPosts] = useState([])
	const { nickname } = useSelector(selectAuth)

	useEffect(() => {
		getUserPost()
	}, [])

	const getUserPost = async () => {
		try {
			const db = await getFirestore(app)
			const q = await query(
				collection(db, 'posts'),
				where('userId', '==', userId)
			)

			await onSnapshot(q, snapshot => {
				setUserPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
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
			<ImageBackground
				style={styles.image}
				source={require('../../assets/images/bgd.jpg')}
			>
				<KeyboardAvoidingView
					style={{
						...styles.wrapper,
						height: userPosts.length !== 0 ? height / 1.2 : height / 2,
					}}
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				>
					<View style={styles.body}>
						<View style={styles.avatarWrapper}>
							<View style={styles.avatar}></View>
							<Text style={styles.title}>{nickname}</Text>
						</View>

						<FlatList
							data={userPosts}
							keyExtractor={({ id }) => id}
							renderItem={({
								item: { locality, location, comment, photo, id },
							}) => (
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
									<Text
										style={{ ...styles.text, marginBottom: 4, marginLeft: 6 }}
									>
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
				</KeyboardAvoidingView>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	body: {
		flex: 1,

		marginTop: -10,
		paddingHorizontal: 16,
		backgroundColor: '#fff',
		borderRadius: 20,
	},
	title: { color: '#000', fontSize: 20, marginVertical: 32 },
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	},
	wrapper: {
		backgroundColor: '#fff',
		paddingBottom: 1,
	},
	avatarWrapper: {
		alignItems: 'center',
	},
	avatar: {
		marginTop: -60,
		marginHorizontal: 'auto',
		width: 120,
		height: 120,
		backgroundColor: 'rgba(0,0,0,0.6)',

		borderRadius: 16,
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
	photo: { borderRadius: 6 },
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
})
