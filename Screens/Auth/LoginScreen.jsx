import { useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Keyboard,
	TouchableWithoutFeedback,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	useWindowDimensions,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/auth/authOperatiom'

export const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	const [securePass, setSecurePass] = useState(true)
	const { width } = useWindowDimensions()
	const dispatch = useDispatch()

	const emailHandler = text => setEmail(text)
	const passwordHandler = text => setPassword(text)

	const handleSubmit = () => {
		Keyboard.dismiss()
		setIsShowKeyboard(false)
		dispatch(loginUser({ email, password }))
		setEmail('')
		setPassword('')
	}
	const keyboardHide = () => {
		setIsShowKeyboard(false)
		Keyboard.dismiss()
	}

	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<View style={styles.container}>
				<ImageBackground
					style={styles.image}
					source={require('../../assets/images/bgd.jpg')}
				>
					<KeyboardAvoidingView
						style={{
							...styles.wrapper,
							width,
							marginBottom: isShowKeyboard ? 60 : 0,
						}}
						behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
					>
						<View style={styles.form}>
							<Text style={styles.title}>Войти</Text>
							<View style={styles.fieldset}>
								<View style={styles.field}>
									<TextInput
										value={email}
										onChangeText={emailHandler}
										placeholder='Адрес электронной почты'
										style={styles.input}
										onSubmitEditing={text => {
											setIsShowKeyboard(false)
										}}
									/>
								</View>
								<View style={styles.field}>
									<TextInput
										value={password}
										onChangeText={passwordHandler}
										placeholder='Пароль'
										secureTextEntry={securePass}
										style={styles.input}
										onSubmitEditing={text => {
											setIsShowKeyboard(false)
										}}
									/>
									<TouchableOpacity
										style={styles.inputBtn}
										onPress={() => setSecurePass(prevState => !prevState)}
									>
										<Text style={{ ...styles.label, color: '#0000ff' }}>
											{securePass ? 'Показать' : 'Скрыть'}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
							<TouchableOpacity style={styles.btn} onPress={handleSubmit}>
								<Text style={styles.label}>Войти</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.link}
								onPress={() => navigation.navigate('Registration')}
							>
								<Text style={styles.label}>
									Нет аккаунта?{'  '}
									<Text
										style={{ fontSize: 14, textDecorationLine: 'underline' }}
									>
										Зарегистрироваться
									</Text>
								</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	},
	wrapper: {
		backgroundColor: '#fff',
		paddingBottom: 1,
	},
	form: {
		marginTop: -10,
		paddingHorizontal: 16,
		paddingTop: 32,
		backgroundColor: '#fff',
		borderRadius: 20,
	},
	avatar: {
		position: 'relative',
		marginTop: -60,
		width: 120,
		height: 120,
		backgroundColor: '#fff',
		borderRadius: 16,
		marginBottom: 32,
	},
	iconThumb: {
		position: 'absolute',
		bottom: 0,
		right: -10,
		width: 25,
		height: 25,
	},
	fieldset: {
		gap: 16,
		marginBottom: 43,
	},
	field: {
		position: 'relative',
	},
	inputBtn: {
		position: 'absolute',
		right: 0,
		top: 15,
	},
	input: {
		height: 50,
		padding: 10,
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		borderWidth: 1,
		color: '#212121',
		fontFamily: 'Roboto-Regular',
		borderColor: 'transparent',
	},
	label: { fontFamily: 'Roboto-Regular' },
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 500,
		color: '#212121',
		marginBottom: 32,
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 51,
		marginBottom: 16,
		backgroundColor: '#FF6C00',
		borderRadius: 100,
		color: '#fff',
	},
	link: {
		alignItems: 'center',
		marginBottom: 133,
	},
})
