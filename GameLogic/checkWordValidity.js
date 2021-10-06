
import { allwords } from './allwords'

const isValidWord = (userWord) => {
    return allwords.includes(userWord.toLowerCase())
}

export default isValidWord