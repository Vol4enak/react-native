import { getFirestore, collection, addDoc } from 'firebase/firestore'

import { useEffect, useState } from 'react'
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
} from 'expo-location'
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

import { EvilIcons } from '@expo/vector-icons'

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Image,
} from 'react-native'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import { useWindowDimensions } from 'react-native'
import app from '../../firebase'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/auth/selectors'

export const CreatePostScreen = ({ navigation: { navigate } }) => {
	const [permission, requestPermission] = Camera.useCameraPermissions()
	const [status, requestPermissionLocation] = useForegroundPermissions()

	const { nickname, userId } = useSelector(selectAuth)
	const [type, setType] = useState(CameraType.back)
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	const { height } = useWindowDimensions()
	const [camera, setCamera] = useState(null)
	const [location, setLocation] = useState(null)
	const [comment, setComment] = useState('')
	const [photo, setPhoto] = useState(null)
	const [locality, setLocality] = useState('')

	useEffect(() => {
		;async () => {
			await MediaLibrary.requestPermissionsAsync()
		}
		requestPermission()
		requestPermissionLocation()
	}, [])

	const takePhoto = async () => {
		const newPhoto = await camera.takePictureAsync()
		const {
			coords: { latitude, longitude },
		} = await getCurrentPositionAsync()

		setPhoto(newPhoto.uri)
		setLocation({ latitude, longitude })
		console.log(x)
	}

	const uploadPhotoToServer = async () => {
		try {
			// task: upload
			const response = await fetch(photo)
			const file = await response.blob()
			const imagePath = `postImage/${photo.substring(
				photo.lastIndexOf('/') + 1
			)}`
			const storage = getStorage()
			const storageRef = ref(storage, imagePath)

			await uploadBytes(storageRef, file)

			// task: download
			const updatedStorage = await getStorage()
			const processedPhoto = await getDownloadURL(
				ref(updatedStorage, imagePath)
			)

			return processedPhoto
		} catch (error) {
			console.log(error)
		}
	}

	const uploadPostToServer = async () => {
		try {
			const photo = await uploadPhotoToServer()
			const db = await getFirestore(app)
			await addDoc(collection(db, 'posts'), {
				userId,
				nickname,
				photo,
				comment,
				location,
				locality: locality === '' ? 'location' : locality,
			})
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	}

	const sendPost = () => {
		uploadPostToServer()
		navigate('DefaultScreen')
	}

	const keyboardHide = () => {
		setIsShowKeyboard(false)
		Keyboard.dismiss()
	}

	const handlMessage = text => setComment(text)
	const handleLocality = text => setLocality(text)

	function toggleCameraType() {
		setType(current =>
			current === CameraType.back ? CameraType.front : CameraType.back
		)
	}

	if (permission?.status === 'granted') {
		return (
			<TouchableWithoutFeedback nPress={keyboardHide}>
				<View style={styles.container}>
					<KeyboardAvoidingView
						style={{
							marginBottom: isShowKeyboard ? 60 : 0,
						}}
						behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
					>
						<View style={styles.form}>
							<View>
								<Camera
									style={{ ...styles.camera, height: height / 2.2 }}
									type={type}
									ref={setCamera}
								>
									{photo && (
										<View style={styles.photoContainer}>
											<Image source={{ uri: photo }} style={styles.photo} />
										</View>
									)}
									<TouchableOpacity
										style={styles.toggleButton}
										onPress={takePhoto}
									>
										<MaterialIcons
											name='enhance-photo-translate'
											size={24}
											color='#BDBDBD'
										/>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={toggleCameraType}
										style={{ position: 'absolute', bottom: 10, right: 15 }}
									>
										<Octicons
											name='arrow-switch'
											size={24}
											color='black'
											style={{
												transform: [{ rotate: '90deg' }],
											}}
										/>
									</TouchableOpacity>
								</Camera>
								<Text style={styles.label}>Загрузите фото</Text>
							</View>
							<View style={styles.field}>
								<TextInput
									value={comment}
									style={styles.input}
									placeholder='Название...'
									onChangeText={handlMessage}
								/>
							</View>

							<View style={styles.field}>
								<EvilIcons name='location' size={24} color='black' />
								<TextInput
									value={locality}
									style={styles.input}
									placeholder='Местность...'
									onChangeText={handleLocality}
								/>
							</View>
							<TouchableOpacity
								style={{
									...styles.btnSubmit,
									// backgroundColor: validation ? '#FF6C00' : '#F6F6F6',
								}}
								onPress={sendPost}
							>
								<Text
									style={{
										...styles.text,
										// color: validation ? '#fff' : '#BDBDBD',
									}}
								>
									Опубликовать
								</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		)
	} else {
		return (
			<TouchableWithoutFeedback nPress={keyboardHide}>
				<View style={styles.container}>
					<View
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
					>
						<Text
							style={{
								color: '#000',
							}}
						>
							Allow the camera
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 32,
		backgroundColor: '#fff',
	},
	form: { gap: 48 },
	camera: {
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	photoContainer: {
		position: 'absolute',
		bottom: 10,
		left: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
	photo: { width: 60, height: 60, borderRadius: 10 },
	toggleButton: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		width: 60,
		backgroundColor: ' rgba(255, 255, 255, 0.3)',
		borderRadius: 100,
	},
	text: { textAlign: 'center' },
	label: {
		fontSize: 16,
		lineHeight: 19,
		color: '#BDBDBD',
	},
	field: {
		flexDirection: 'row',
		height: 20,
		gap: 4,
	},
	input: { flex: 1 },
	btnSubmit: {
		marginHorizontal: 2,
		borderRadius: 100,
		paddingVertical: 16,
	},
})
