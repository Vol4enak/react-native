import {
	doc,
	getFirestore,
	setDoc,
	addDoc,
	collection,
	onSnapshot,
} from 'firebase/firestore'

import { useEffect, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
} from 'react-native'
import {} from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/auth/selectors'
import app from '../../firebase'

export const CommentsScreen = ({ route }) => {
	const { nickname } = useSelector(selectAuth)
	const [comment, setComment] = useState('')
	const { postId } = route.params
	const [allComments, setAllComments] = useState([])

	useEffect(() => {
		getAllPosts()
		console.log('allComments', allComments)
	}, [])
	const creactPost = async () => {
		try {
			const db = getFirestore(app)

			await addDoc(collection(db, `posts/${postId}/comments`), {
				nickname,
				comment,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const getAllPosts = async () => {
		try {
			const db = await getFirestore(app)
			await onSnapshot(collection(db, `posts/${postId}/comments`), snapshot => {
				setAllComments(
					snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
				)
			})
		} catch (error) {
			console.log(error)
		}
	}
	const handleComment = text => setComment(text)
	return (
		<View style={styles.container}>
			<FlatList
				data={allComments}
				renderItem={({ item }) => (
					<View style={styles.commentContainer}>
						<Text>{item.nickname}</Text>
						<Text>{item.comment}</Text>
					</View>
				)}
				keyExtractor={({ id }) => id}
			/>
			<View style={styles.form}>
				<View style={styles.field}>
					<TextInput
						value={comment}
						style={styles.input}
						placeholder='Залишити коментар'
						onChangeText={handleComment}
					/>
				</View>
				<TouchableOpacity style={styles.btnSubmit} onPress={creactPost}>
					<Text style={styles.text}>Надіслати</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',

		paddingVertical: 20,
	},
	commentContainer: {
		marginHorizontal: 10,
		marginBottom: 10,
		padding: 8,
		borderWidth: 1,
		borderColor: '#BDBDBD',
		borderRadius: 6,
	},

	form: { marginTop: 30 },
	text: { textAlign: 'center', fontSize: 20 },
	label: {
		fontSize: 16,
		lineHeight: 19,
		color: '#BDBDBD',
	},
	field: {
		marginHorizontal: 10,
		marginBottom: 20,
		height: 30,
		gap: 4,
		borderColor: 'transparent',
		borderBottomColor: '#a9a9a9',
		borderWidth: 2,
	},
	input: { flex: 1 },
	btnSubmit: {
		borderRadius: 10,
		marginHorizontal: 30,
		paddingVertical: 8,
		borderWidth: 1,
		borderColor: `#ff7f50`,
	},
})
