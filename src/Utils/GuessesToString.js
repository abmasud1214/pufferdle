import { differenceInDays } from 'date-fns'


const FIRST_DAY = new Date(2023, 7, 1);

function createRowFromGuess(guess) {
    const emojiFromStr = (str) => {
        return `${str === "green" ? '🟩' : str === 'yellow' ? '🟨' : '⬛'}`
    }

    return "\n" + emojiFromStr(guess.season) + emojiFromStr(guess.weather) + emojiFromStr(guess.location) + emojiFromStr(guess.time) + ((guess.correct) ? "🟩" : "⬛");
}

function stringFromFishResults(results) {
    const numTrue = Object.values(results).filter(Boolean).length;

    if (numTrue === 0) {
        return "";
    } else if (numTrue === 1) {
        return "\n⬛⬛🎣⬛⬛";
    } else if (numTrue === 2) {
        return `\n⬛🎣⬛${results.treasure ? "👑" : "⭐"}⬛`;
    } else {
        return "\n🎣⬛👑⬛⭐";
    }
} 

export default function guessesToString(guesses, numGuess, fishResults, daily, day, hardmode){

    const lines = guesses.map((guess, i) => ((i < numGuess) ? createRowFromGuess(guess) : ""));

    console.log(FIRST_DAY, new Date(), differenceInDays(new Date(), FIRST_DAY));

    return `Pufferdle ${daily ? `#${differenceInDays(new Date(), FIRST_DAY)}` : "Random"}${hardmode ? "*" : ""} ${numGuess}/6 ` +
    stringFromFishResults(fishResults) +
    lines.join("");
}