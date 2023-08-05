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

    const [dayInfo, setDayInfo] = React.useState();

    const [skip, setSkip] = React.useState([...Array(6).fill(false)])
        
    React.useEffect(() => {
        console.log(targetFish);

        if (daily) {
            const day = JSON.parse(localStorage.getItem("dayInfo"))
            
            setDayInfo(day);
            setFormattedGuesses(day.fg);
            setGuessHistory(day.g);
            setCurrentGuess(day.ng);
            setGameEnd(day.completed);
            setUpdatedFR(day.fr ? day.fr : fishResults);
            // console.log(fishResults)

            setSkip(() => {
                return [...Array(6)].map((_, i) => {
                    return i < day.ng;
                })
            })

            if (day.completed) {
                setShowModal(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (daily && dayInfo !== undefined) {
            setDayInfo(prevDayInfo => ({
                ...prevDayInfo,
                completed: gameEnd,
                g: guessHistory,
                fg: formattedGuesses,
                fr: updatedFR,
                ng: currentGuess,
            }));
        }
    }, [formattedGuesses, guessHistory, updatedFR, gameEnd]);

    React.useEffect(() => {
        if (daily && dayInfo !== undefined) {
            localStorage.setItem("dayInfo", JSON.stringify(dayInfo));
        }
    }, [daily, dayInfo]);


    React.useEffect(() => {
        setTimeout(() => {(gameEnd && setShowModal(true))}, 2000)
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
        }
        
        setCurrentGuess(prevState => prevState + 1);
    }


    return (
        <div className="container">
           <FishMenu className="FishMenu" onGuess={onGuess}/>
           <GuessGrid className="GuessGrid" guessHistory={formattedGuesses} skip={skip}/>
           {showModal && <EndModal 
                targetFish={targetFish} 
                fishResults={updatedFR} 
                correct={correct} 
                daily={true} 
                onClose={() => setShowModal(false)}
                guesses={formattedGuesses}
                numGuess = {currentGuess} />}
        </div>
    )
}