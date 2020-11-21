import {DefaultTheme} from 'react-native-paper'

export const theme={
    ...DefaultTheme,
    dark: true,
    mode: 'adaptive',
    roundness: 5,
    colors:{
        ...DefaultTheme.colors,
        primary: '#E53298',
        accent: '#06081E',
        text: '#f4e6ff',
        surface: '#2d0679',
        background: '#06081E',
        placeholder: '#E1E4E7',
        disabled: '#f2f2f2'
    },
    fonts: {
        ...DefaultTheme.fonts
    },
    animation:{
        ...DefaultTheme.animation
    }
}