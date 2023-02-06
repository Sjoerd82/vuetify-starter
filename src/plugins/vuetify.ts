/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, ThemeDefinition } from 'vuetify'
//import colors from 'vuetify/lib/util/colors'

//
// Additional properties, all optional!
//
interface ExpandedThemeDefinition extends ThemeDefinition {
    title?: string
    backgroundImage?: string
}

const LightTheme: ExpandedThemeDefinition = {
    title: "Light mode",
    backgroundImage: "exclusive-paper.png",
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        /*
            appBar:'#fff', //default = #fff
            mobileAppBar: '#fff',// default=f5f5f5
            primary: '#2196F3', //colors.blue, // default= colors.blue
            primaryAlt: '#2196F3', //colors.blue,
            background: '#fff', //FEFDF6
            backgroundMobile: '#eef',
            card: '#FEFDF6',
            accent: '#f00',
            inputBackground: '#eeeef4',
            mobileAppBarIconActive: '#2196F3', //colors.blue,
        */
  }
}

const DarkTheme: ExpandedThemeDefinition = {
    title: "Dark mode",
    //backgroundImage: "@/assets/asfalt-dark.png",
    backgroundImage: "asfalt-dark.png",
    dark: true,
    colors: {
        /* Base colors
         *
        background: '#111111',
        surface: '#212121',
        */
        primary: '#2196F3', //==colors.blue.base,   // CHANGED; Default: #bb86fc
        secondary: '#9E9E9E', //colors.grey.base, // CHANGED; Default: #03dac4
        /*
         * Base alert colors
         *
        success: '#4caf50',
        warning: '#fb8a00',
        error: '#cf6679',
        info: '#2194f3',
        */
        /*
         *  The following are the text colors on the respective backgrounds.
         *  These are auto calculated based on contrast.
         *  But can be overriden here.
         *
        'on-background': string
        'on-surface': string
        'on-primary': string
        'on-secondary': string
        'on-success': string
        'on-warning': string
        'on-error': string
        'on-info': string
        */
    },
}

const LightGold: ExpandedThemeDefinition = {
    title: "Gold",
    dark: false,
    colors: {
        primary: '#ffd56b',
        secondary: '#996e00',
    }
}

const DarkGold: ExpandedThemeDefinition = {
    title: "Black Gold",
    dark: true,
    colors: {
        primary: '#ffd56b',
        secondary: '#996e00',
    }
}

const GitHubDark: ExpandedThemeDefinition = {
    title: "GitHub",
    dark: true,
    colors: {
        background: '#24292e',
        surface: '#2f363d',
        primary: '#79b8ff',
        secondary: '#959da5',
    },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        defaultTheme: 'DarkTheme',
        variations: {
            colors: ['surface', 'primary', 'secondary'],
            lighten: 1,
            darken: 4,
        },
        themes: {
            LightTheme,
            DarkTheme,
            LightGold,
            DarkGold,
            //GitHubDark,
        },
    },
})