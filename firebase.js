import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat//storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCkULtauPBlatiOHoT1qMs8KLQzIWS3It8',
	authDomain: 'react-native-social-1eeb4.firebaseapp.com',
	projectId: 'react-native-social-1eeb4',
	storageBucket: 'react-native-social-1eeb4.appspot.com',
	messagingSenderId: '1022422293819',
	appId: '1:1022422293819:web:98e9c3363890923a15eb1e',
	measurementId: 'G-K3LNGFVZHL',
}

const app = initializeApp(firebaseConfig)

export default app

// const analytics = getAnalytics(app)
// apiKey: process.env.REACT_NATIVE_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_NATIVE_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_NATIVE_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_NATIVE_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_NATIVE_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_NATIVE_APP_FIREBASE_APP_ID,
// 	measurementId: process.env.REACT_NATIVE_APP_FIREBASE_MEASUREMENT_ID,
