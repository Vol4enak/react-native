import { createAsyncThunk } from '@reduxjs/toolkit'
import '../../firebase'
import {
	getAuth,
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	// onAuthStateChanged,
} from 'firebase/auth'

// import { updateUserProfile } from './authSlice'

export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ email, password, login }, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			await createUserWithEmailAndPassword(auth, email, password)
			await updateProfile(auth.currentUser, {
				displayName: login,
			})

			const { uid, displayName } = await auth.currentUser

			return {
				userId: uid,
				nickname: displayName,
			}
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			const { user } = await signInWithEmailAndPassword(auth, email, password)

			return { userId: user.uid, nickname: user.displayName }
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

export const logOutUser = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			await signOut(auth)

			return
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

// export const refreshUser = createAsyncThunk(
// 	'auth/refresh',
// 	async (_, { rejectWithValue, dispatch }) => {
// 		try {
// 			const auth = await getAuth()
// 			await onAuthStateChanged(auth, user => {
// 				if (user) {
// 					return dispatch(
// 						updateUserProfile({ userId: user.uid, nickname: user.displayName })
// 					)
// 				}
// 				return rejectWithValue('User not found')
// 			})
// 		} catch (error) {
// 			console.log(error)
// 			return rejectWithValue(error.message)
// 		}
// 	}
// )
