export const Colors = {
    orange: '#FFA62B',
    gray: '#848995',
    lightBlue: '#67D0FF',
    lightGreen: '#CEFF6F',
    red: '#dc2f02',
    error: '#ff99c8',
    blue: {
        primary: '#14274E',
        light: '#394867',
        play: '#2A7CDF',
        error: '#D7385E',
    },
    black: {
        primary: '#000',
        light: '#2A2B2E',
        play: '#1F8407',
    },

}

export const commonStyles = (theme, phoneHeight, phoneWidth) => {

    const common = {
        containerStyle: {
            flex: 1,
            paddingTop: phoneHeight * .05,
            backgroundColor: Colors[theme].primary,
        },
        iconStyle: {
            position: 'absolute',
            left: phoneWidth * .49,
            bottom: phoneHeight * .23
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        borderedText: {
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 20,
            padding: phoneHeight * 0.01,
            fontSize: phoneHeight * .017
        },
    }

    return { common }
}

export const Screens = {
    HOME: 'HOME',
    SELECTION: 'SELECTION',
    GAME: 'GAME',
    INPUT: 'InputLetters'
}

export const errors = {
    repeatedLetters: 'The letters can\'t be repeated',
    invalidWord: 'The word is invalid. Please enter another word',
    wordExists: 'This word already exists. Please enter another word',
    noMinLetters: 'Please enter more letters to make your guess valid'
}

export const GAME = {
    type: {
        NUMBER: 'NUMBER',
        WORD: 'WORD'
    },
    level: {
        EASY: 'EASY',
        MEDIUM: 'MEDIUM',
        HARD: 'HARD'
    },
    letters: {
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6
    }
}