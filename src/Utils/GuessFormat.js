
const validTime = (guess, actual) => {
    if (guess.length > 2) return (validTime(guess.slice(0, 2), actual) || validTime(guess.slice(2), actual))
    if (actual.length > 2) return (validTime(guess, actual.slice(0, 2)) || validTime(guess, actual.slice(2)))
    return ((guess[0] >= actual[0] && guess[0] < actual[1]) || (actual[0] >= guess[0] && actual[0] < guess[1]))
}

const identical_time = (guess, actual) => {
    if (guess.length > 2 && actual.length > 2) {
        return (identical_time(guess.slice(0, 2), actual.slice(0, 2)) && identical_time(guess.slice(2), actual.slice(2)))
    } else if (guess.length > 2 || actual.length > 2) {
        return false;
    } else {
        return (guess[0] === actual[0] && guess[1] === actual[1]);
    }
}

const intersect = (guess, actual) => {
    const intersection = guess.filter(value => actual.includes(value) || actual.includes("Any") || value.includes("Any"));
    // console.log(guess, actual);
    return (intersection.length > 0);
}

const identical = (guess, actual) => {
    const intersection = guess.filter(value => actual.includes(value));
    return (intersection.length === guess.length && intersection.length === actual.length);
}

const formatGuess = (guessFish, actualFish) => {
    if (guessFish.name === actualFish.name) {
        return {
            correct: true,
            season: "green",
            weather: "green",
            location: "green",
            time: "green",
            behavior: "green",
            difficulty: "green",
            img: guessFish.src,
        }
    }
    return {
        correct: false,
        season: identical(guessFish.season, actualFish.season) ? "green" : intersect(guessFish.season, actualFish.season) ? "yellow" : "gray",
        weather: identical(guessFish.weather, actualFish.weather) ? "green" : intersect(guessFish.weather, actualFish.weather) ? "yellow" : "gray",
        location: identical(guessFish.location, actualFish.location) ? "green" : intersect(guessFish.location, actualFish.location) ? "yellow" : "gray",
        time: identical_time(guessFish.time, actualFish.time) ? "green" : validTime(guessFish.time, actualFish.time) ? "yellow" : "gray",
        behavior: guessFish.behavior === actualFish.behavior ? "green" : "gray",
        difficulty: guessFish.difficulty === actualFish.difficulty ? "green" : guessFish.difficulty > actualFish.difficulty ? "high" : "low",
        img: guessFish.src,
    }
}

export {formatGuess}