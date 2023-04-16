import React from "react";

import fishdata from "../fishdata.js";
import "./PufferdleGuess.css"
import FishMenu from "./FishMenu.js";
import GuessGrid from "./GuessGrid.js";
import { formatGuess } from "../Utils/GuessFormat.js";
import EndModal from "./EndModal.js";

export default function PufferdleGuess(props) {

    const numGuesses = 6;
    const [showModal, setShowModal] = React.useState(false);
    const [guessHistory, setGuessHistory] = React.useState([...Array(6)]);
    const [formattedGuesses, setFormatteddGuesses] = React.useState([...Array(6)]);
    const [currentGuess, setCurrentGuess] = React.useState(0);
    const [gameEnd, setGameEnd] = React.useState(false);
    const [correct, setCorrect] = React.useState(false);
    const {fishResults, targetFish} = props;
        
    React.useEffect(() => {
        console.log(targetFish);
    }, [0])

    React.useEffect(() => {
        setTimeout(() => {(gameEnd && setShowModal(true))}, 2000)
    }, [gameEnd])

    const onGuess = (guessedFish) => {
        window.scrollTo(0, 0);

        if (guessHistory.filter(value => (value && guessedFish.name == value.name)).length > 0 || gameEnd) {
            return;
        }

        setGuessHistory(prevState => {
            const hist = prevState.map((c, i) => (i === currentGuess ? guessedFish : c));
            return hist;
        })
        setFormatteddGuesses(prevState => {
            const hist = prevState.map((c, i) => (i === currentGuess ? formatGuess(guessedFish, targetFish) : c));
            return hist;
        })

        if (guessedFish.name === targetFish.name || currentGuess + 1 == numGuesses) {
            setGameEnd(true);
            setCorrect(guessedFish.name === targetFish.name);
        }
        
        setCurrentGuess(prevState => prevState + 1);
    }


    return (
        <div className="container">
           <FishMenu className="FishMenu" onGuess={onGuess}/>
           <GuessGrid className="GuessGrid" guessHistory={formattedGuesses}/>
           {showModal && <EndModal 
                targetFish={targetFish} 
                fishResults={fishResults} 
                correct={correct} 
                daily={true} 
                onClose={() => setShowModal(false)}/>}
        </div>
    )
}