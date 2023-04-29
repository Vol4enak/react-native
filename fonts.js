import React, { useState } from 'react'
import * as Font from 'expo-font'

export const loadFonts = async () => {
	await Font.loadAsync({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	})
}
