import { DarkTheme, DefaultTheme } from "@react-navigation/native";

import Colors from '../utils/color'

export const Light = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.BLACK,
        buttonActive: Colors.BLACK,
        buttonInactive: Colors.LIGHT_GRAY,
    }
}

export const Dark = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: Colors.WHITE,
        buttonActive: Colors.WHITE,
        buttonInactive: Colors.LIGHT_GRAY,
    }
}
