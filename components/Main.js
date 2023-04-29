import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'

import { useRoute } from '../routes/routes'
import { selectAuth } from '../redux/auth/selectors'
import { refreshUser } from '../redux/auth/authOperatiom'

const Main = () => {
	const { isAuthorization } = useSelector(selectAuth)
	const dispatch = useDispatch()
	const routing = useRoute(isAuthorization)
	const x = useSelector(selectAuth)
	// useEffect(() => {
	// 	dispatch(refreshUser())
	// 	console.log(x)
	// }, [])

	return <NavigationContainer>{routing}</NavigationContainer>
}

export default Main
