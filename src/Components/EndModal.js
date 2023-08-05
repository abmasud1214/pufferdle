import React from 'react'

import "./EndModal.css"

import guessesToString from '../Utils/GuessesToString.js';

const fish_img = new Image();
fish_img.src = require('./../Art/fish.png')

const treasure_img = new Image();
treasure_img.src = require('./../Art/treasurechest.png')

const perfect_img = new Image();
perfect_img.src = require('./../Art/perfect.png')

function StatBar(props) {
    const {ng, num, max} = props;

    //width: `${(num !== 0) ? Math.floor((num / max) * 100) : 3}%`
    // console.log(num)
    return (
        <div className="statLine">
            <h3>{ng}</h3>
            <div className="statBar" style={{width: `${(num !== 0) ? Math.floor((num / max) * 100) : 3}%`}}>
                <h3>{num}</h3>
            </div>
        </div>
    )
}

function StatScreen() {
    const [stats, setStats] = React.useState(JSON.parse(localStorage.getItem("stats")))
    const max = Math.max(...Object.values(stats))

    // console.log(stats);
    return (
        <div style={{margin: "10px 0px", display: "flex", flexDirection: "column", gap: "3px"}}>
            <StatBar ng={1} num={stats[1]} max={max}/>
            <StatBar ng={2} num={stats[2]} max={max}/>
            <StatBar ng={3} num={stats[3]} max={max}/>
            <StatBar ng={4} num={stats[4]} max={max}/>
            <StatBar ng={5} num={stats[5]} max={max}/>
            <StatBar ng={6} num={stats[6]} max={max}/>
            <StatBar ng={"X"} num={stats["X"]} max={max}/>
        </div>
    )
}


export default function EndModal(props) {

    const { targetFish, fishResults, guesses, numGuess, correct, daily, onClose } = props;
    
    const [clipboardText, setClipboardText] = React.useState("");

    React.useEffect(() => {
        if (clipboardText !== ""){
            const copyContent = async () => {
                try {
                    await navigator.clipboard.writeText(clipboardText);
                    console.log("Content copied to clipboard");
                } catch (err) {
                    console.error("Failed to copy: ", err);
                }
            }
            copyContent();
        }
    }, [clipboardText])

    return (
        <div className="background" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div>
                    {correct && <h1>Congratulations!</h1>}
                    {!correct && <h1>Nice Try</h1>}
                    <h2>{fishResults.caught ? 
                        `You caught a${/[aeiou]/.test(targetFish.name.toLowerCase()[0]) ? "n" : ""}` 
                        : `The fish was a${/[aeiou]/.test(targetFish.name.toLowerCase()[0]) ? "n" : ""}`} {targetFish.name}</h2>
                </div>
                <div className="resultImages">
                    {fishResults.caught && <img src={fish_img.src} alt="🎣"/>}
                    {fishResults.treasure && <img src={treasure_img.src} alt="👑"/>}
                    {fishResults.perfect && <img src={perfect_img.src} alt="⭐"/>}
                </div>
                {daily && <StatScreen />}
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
