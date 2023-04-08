import React from "react";

import fishdata from "../fishdata.js";
import "./PufferdleGuess.css"
import FishMenu from "./FishMenu.js";
import GuessGrid from "./GuessGrid.js";
import { formatGuess } from "../Utils/GuessFormat.js";

export default function PufferdleGuess(props) {

    const [numGuesses, setNumGuesses] = React.useState(6);
    const [guessHistory, setGuessHistory] = React.useState([...Array(6)]);
    const [formattedGuesses, setFormateddGuesses] = React.useState([...Array(6)]);
    const [currentGuess, setCurrentGuess] = React.useState(0);
    const {fishResults, targetFish} = props;
        
    const onGuess = (guessedFish) => {
        setGuessHistory(prevState => {
            const hist = prevState.map((c, i) => (i === currentGuess ? guessedFish : c));
            return hist;
        })
        setFormateddGuesses(prevState => {
            const hist = prevState.map((c, i) => (i === currentGuess ? formatGuess(guessedFish, targetFish) : c));
            return hist;
        })
        
        setCurrentGuess(prevState => prevState + 1);
    }


    return (
        <div>
           <FishMenu onGuess={onGuess}/>
           <GuessGrid guessHistory={formattedGuesses}/>
        </div>
    )
}