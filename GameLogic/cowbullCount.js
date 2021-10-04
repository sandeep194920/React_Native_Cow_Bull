
export const cowBullCount = (computerChoice, userChoice) => {
    // hidden word - sky
    // guessed word - ink  -- 1c

    // hidden word - sky
    // guessed word - sat   -- 1b

    // hidden word - sky
    // guessed word - pat   -- 00

    const hidden = [...computerChoice]; // S  K  Y
    const guessed = [...userChoice]; // P  S  T
    let cow = 0;
    let bull = 0;
    hidden.forEach((hiddenLetter, hiddenIndex) => {
        // got the first letter of hidden and this should be compared with all the letters in guessed to find the cow and bull count
        guessed.forEach((guessedLetter, guessedInex) => {
            if (hiddenLetter === guessedLetter) {
                if (hiddenIndex === guessedInex) bull++;
                else cow++;
            }
        });
    });
    return { cow, bull };
}