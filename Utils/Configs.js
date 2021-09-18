export const Colors = {
    orange: '#FFA62B',
    gray: '#848995',

    blue: {
        primary: '#14274E',
        light: '#394867',
        play: '#2A7CDF'
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
            left: phoneWidth * .5,
            bottom: phoneHeight * .23
        }
    }

    return { common }
}