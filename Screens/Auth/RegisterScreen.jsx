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
import Svg, { Path } from 'react-native-svg'

import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/auth/authOperatiom'

export const RegisterScreen = ({ navigation }) => {
	const [login, setLogin] = useState('')
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [securePass, setSecurePass] = useState(true)

	const dispatch = useDispatch()

	const { width } = useWindowDimensions()

	const loginHandler = text => setLogin(text)
	const emailHandler = text => setEmail(text)
	const passwordHandler = text => setPassword(text)

	const handleSubmit = () => {
		Keyboard.dismiss()
		setIsShowKeyboard(false)

		dispatch(
			registerUser({
				email,
				password,
				login,
			})
		)

		setEmail('')
		setPassword('')
		setLogin('')
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
							<View style={styles.avatarWrapper}>
								<View style={styles.avatar}>
									<TouchableOpacity style={styles.iconThumb}>
										<Svg width={25} height={25} viewBox='0 0 25 25'>
											<Path
												fill-rule='evenodd'
												clip-rule='evenodd'
												d='M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z'
												fill='#FF6C00'
											/>
										</Svg>
									</TouchableOpacity>
								</View>
							</View>
							<Text style={styles.title}>Регистрация</Text>
							<View style={styles.fieldset}>
								<View style={styles.field}>
									<TextInput
										onFocus={() => setIsShowKeyboard(true)}
										value={login}
										onChangeText={loginHandler}
										placeholder='Логин'
										style={styles.input}
										onSubmitEditing={text => {
											setIsShowKeyboard(false)
										}}
									/>
								</View>
								<View style={styles.field}>
									<TextInput
										onFocus={() => setIsShowKeyboard(true)}
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
										onFocus={() => setIsShowKeyboard(true)}
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
								<Text style={styles.label}>Зарегистрироваться</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.link}
								onPress={() => navigation.navigate('Login')}
							>
								<Text style={styles.label}>
									Уже есть аккаунт?{'  '}
									<Text
										style={{ fontSize: 14, textDecorationLine: 'underline' }}
									>
										Войти
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
		backgroundColor: '#fff',
		borderRadius: 20,
	},
	avatarWrapper: {
		alignItems: 'center',
	},
	avatar: {
		position: 'relative',
		marginTop: -60,
		marginHorizontal: 'auto',
		width: 120,
		height: 120,
		backgroundColor: 'rgba(0,0,0,0.6)',

		borderRadius: 16,
		marginBottom: 32,
	},
	iconThumb: {
		position: 'absolute',
		borderColor: 'red',
		borderWidth: 1,
		borderRadius: 50,
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
		right: 16,
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
	label: {
		fontFamily: 'Roboto-Regular',
	},
	title: {
		textAlign: 'center',
		fontFamily: 'Roboto-Bold',
		fontSize: 30,
		fontWeight: 500,
		color: '#212121',
		marginBottom: 32,
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 51,
		marginBottom: 32,
		backgroundColor: '#FF6C00',
		borderRadius: 100,
		color: '#fff',
	},
	link: {
		alignItems: 'center',
		marginBottom: 35,
	},
})
