import React from 'react'

import "./EndModal.css"

import guessesToString from '../Utils/GuessesToString.js';

const fish_img = new Image();
fish_img.src = require('./../Art/fish.png')

const treasure_img = new Image();
treasure_img.src = require('./../Art/treasurechest.png')

const perfect_img = new Image();
perfect_img.src = require('./../Art/perfect.png')

export default function EndModal(props) {

    const { targetFish, fishResults, guesses, numGuess, correct, daily, onClose } = props;
    
    const [clipboardText, setClipboardText] = React.useState("");

    React.useEffect(() => {
        const copyContent = async () => {
            try {
                await navigator.clipboard.writeText(clipboardText);
                console.log("Content copied to clipboard");
            } catch (err) {
                console.error("Failed to copy: ", err);
            }
        }
        copyContent();
    }, [clipboardText])

    return (
        <div className="background" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div>
                    {correct && <h1>Congratulations!</h1>}
                    {!correct && <h1>Unfortunate</h1>}
                    <h2>{fishResults.caught ? 
                        `You caught a${targetFish.name.toLowerCase()[0] === "a" ? "n" : ""}` 
                        : `The fish was a${targetFish.name.toLowerCase()[0] === "a" ? "n" : ""}`} {targetFish.name}</h2>
                    <div className="resultImages">
                        {fishResults.caught && <img src={fish_img.src} alt="🎣"/>}
                        {fishResults.treasure && <img src={treasure_img.src} alt="👑"/>}
                        {fishResults.perfect && <img src={perfect_img.src} alt="⭐"/>}
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        setClipboardText(guessesToString(guesses, numGuess, fishResults, daily, 0, false));
                        console.log(guessesToString(guesses, numGuess, fishResults, daily, 0, false));
                    }}>Copy to Clipboard</button>
                </div>
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
