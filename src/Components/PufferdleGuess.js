import React from "react";

import "./PufferdleGuess.css"
import FishMenu from "./FishMenu.js";
import GuessGrid from "./GuessGrid.js";
import { formatGuess } from "../Utils/GuessFormat.js";
import EndModal from "./EndModal.js";

export default function PufferdleGuess(props) {

    const numGuesses = 6;
    const [showModal, setShowModal] = React.useState(false);
    const [guessHistory, setGuessHistory] = React.useState([...Array(6)]);
    const [formattedGuesses, setFormattedGuesses] = React.useState([...Array(6)]);
    const [currentGuess, setCurrentGuess] = React.useState(0);
    const [gameEnd, setGameEnd] = React.useState(false);
    const [correct, setCorrect] = React.useState(false);
    const {fishResults, targetFish, daily} = props;
    const [updatedFR, setUpdatedFR] = React.useState(fishResults);

    const [dayInfo, setDayInfo] = React.useState({});

    const [skip, setSkip] = React.useState([...Array(6).fill(false)])
        
    React.useEffect(() => {
        // console.log(targetFish);

        if (daily) {
            const day = JSON.parse(localStorage.getItem("dayInfo"))
            
            setDayInfo(day);
            setFormattedGuesses(day.fg);
            setGuessHistory(day.g);
            setCurrentGuess(day.ng);
            setGameEnd(day.completed);
            setUpdatedFR(day.fr ? day.fr : fishResults);
            setCorrect(day.correct);
            // console.log(fishResults)

            setSkip(() => {
                return [...Array(6)].map((_, i) => {
                    return i < day.ng;
                })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (daily && dayInfo !== undefined) {
            setDayInfo(prevDayInfo => ({
                ...prevDayInfo,
                completed: gameEnd,
                g: guessHistory,
                correct: correct,
                fg: formattedGuesses,
                fr: updatedFR,
                ng: currentGuess,
            }));
        }
        // eslint-disable-next-line
    }, [formattedGuesses, guessHistory, updatedFR, gameEnd, correct]);

    React.useEffect(() => {
        if (daily && dayInfo !== undefined) {
            localStorage.setItem("dayInfo", JSON.stringify(dayInfo));
        }
    }, [daily, dayInfo]);


    React.useEffect(() => {
        setTimeout(() => {(gameEnd && setShowModal(true))}, (skip[currentGuess-1] ? 0 : 2000))
        // eslint-disable-next-line
    }, [gameEnd])

    const onGuess = (guessedFish) => {
        window.scrollTo(0, 0);

        if (guessHistory.filter(value => (value && guessedFish.name === value.name)).length > 0 || gameEnd) {
            return;
        }

        setGuessHistory(prevState => {
            const hist = prevState.map((c, i) => (i === currentGuess ? guessedFish : c));
            return hist;
        })
        setFormattedGuesses(prevState => {
            const hist = prevState.map((c, i) => (i === currentGuess ? formatGuess(guessedFish, targetFish) : c));
            return hist;
        })

        if (guessedFish.name === targetFish.name || currentGuess + 1 === numGuesses) {
            setGameEnd(true);
            setCorrect(guessedFish.name === targetFish.name);
            if (daily) {
                let stats = JSON.parse(localStorage.getItem("stats"));
                if (guessedFish.name === targetFish.name) {
                    stats[currentGuess + 1] += 1;
                    stats["daysCorrect"] += 1;
                } else {
                    stats["X"] += 1;
                }
                stats["days"] += 1;
                stats["fishCaught"] += updatedFR["caught"] ? 1 : 0;
                stats["treasure"] += updatedFR["treasure"] ? 1 : 0;
                stats["perfect"] += updatedFR["perfect"] ? 1 : 0;
                localStorage.setItem("stats", JSON.stringify(stats));
            }
        }
        
        setCurrentGuess(prevState => prevState + 1);
    }


    return (
        <div className="container">
            <FishMenu className="FishMenu" 
                onGuess={onGuess} 
                hardMode={daily ? dayInfo["hardMode"] : JSON.parse(localStorage.getItem("settings"))["hardMode"]}/>
            <GuessGrid className="GuessGrid" guessHistory={formattedGuesses} skip={skip}/>
            {showModal && <EndModal 
                targetFish={targetFish} 
                fishResults={updatedFR} 
                correct={correct} 
                daily={daily} 
                hardMode={daily ? dayInfo["hardMode"] : JSON.parse(localStorage.getItem("settings"))["hardMode"]}
                onClose={() => setShowModal(false)}
                guesses={formattedGuesses}
                numGuess = {currentGuess} />}
        </div>
    )
}