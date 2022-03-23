import { DarkTheme, DefaultTheme } from "@react-navigation/native";

import Colors from '../utils/color'

export const Light = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        buttonActive: Colors.BLACK,
        buttonInactive: Colors.LIGHT_GRAY,
    }
}

export const Dark = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        buttonActive: Colors.WHITE,
        buttonInactive: Colors.LIGHT_GRAY,
    }
}
