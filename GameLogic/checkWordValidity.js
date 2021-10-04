
import { allwords } from './allwords'

const isValidWord = (userWord) => {
    console.log(`All words are ${allwords.length}`)
    console.log(`the user word is ${userWord}`)
    return allwords.includes(userWord.toLowerCase())
}

export default isValidWord