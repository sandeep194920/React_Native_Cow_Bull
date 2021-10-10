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
    INPUT: 'INPUT',
    GAME_OVER: 'GAME_OVER',
    RULES: 'RULES'
}

export const errors = {
    repeatedLetters: 'The letters can\'t be repeated',
    invalidWord: 'The word you entered is invalid. Please enter another word',
    wordExists: 'This combination already exists. Please try another combination',
    noMinLetters: 'Please enter more letters to make your guess valid',
    specialChars: 'The letters can\'t include special characters and space'
}

export const gameResultTxt = {
    won: `Hurray! You're really a genius 😃 You guessed it right 😃`,
    lost: `Sorry, You lost the game as you're out of attempts 😥 Better luck next time 😞`,
    revealed: `Sorry, You lost the game as you revealed the word 😥 Better luck next time 😞`
}

export const gameRulesText = [
    'You need to guess the hidden word/number in specified attempts',
    'Number of attempts you have depend on the difficulty level you selected',
    'Letters will not be repeated in the hidden word and can\'t be repeated in your guess too',
    'If you select the WORD game, the hidden word will be a valid word which is in the english dictionary. Your guess should also be a valid word',
    'You win if you guess the word/number in specified attempts based on the cow and bull count of previous guesses',
    'COW (C) means your word/number HAS a letter which is in the hidden word/number but NOT in the exact position',
    'BULL (B) means your word/number HAS a letter which is in the hidden word/number IN the exact position',
    'To see these rules, click on the game logo anywhere in the app'
]

export const AdBannerTypes = {
    banner: 'banner',
    largeBanner: 'largeBanner',
    mediumRectangle: 'mediumRectangle',
    fullBanner: 'fullBanner',
    leaderboard: 'leaderboard',
    smartBannerPortrait: 'smartBannerPortrait',
    smartBannerLandscape: 'smartBannerLandscape'
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
    },
}

export const GameAttempts = {
    '3': {
        EASY: {
            chances: 10,
            hints: 2,
        },
        MEDIUM: {
            chances: 8,
            hints: 1
        },
        HARD: {
            chances: 6,
            hints: 1
        }
    },
    '4': {
        EASY: {
            chances: 12,
            hints: 2
        },
        MEDIUM: {
            chances: 10,
            hints: 2
        },
        HARD: {
            chances: 8,
            hints: 1
        }
    },
    '5': {
        EASY: {
            chances: 14,
            hints: 3
        },
        MEDIUM: {
            chances: 12,
            hints: 3
        },
        HARD: {
            chances: 9,
            hints: 2
        }
    },
    '6': {
        EASY: {
            chances: 15,
            hints: 3
        },
        MEDIUM: {
            chances: 12,
            hints: 3
        },
        HARD: {
            chances: 10,
            hints: 2
        }
    }
}