const noRepeatedLetters = require('no-repeated-letters');

const randomWords = require('random-words');

export const computerWord = (wordLength) => {
    console.log("The random word is ", randomWords())
    console.log(noRepeatedLetters('ABC'))
    let word = randomWords()
    while (word.length !== +wordLength || !noRepeatedLetters(word)) {
        // the word should not exceed the length selected and it should not have repeated characters
        word = randomWords();
    }
    return word

}

export const computerNumber = (wordLength) => {
    let numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let number = ''
    for (let i = 0; i < +wordLength; i++) {
        let randomIndex = Math.floor(Math.random() * numberList.length)
        number += numberList[randomIndex]
        numberList.splice(randomIndex, 1)
    }
    return number
}
