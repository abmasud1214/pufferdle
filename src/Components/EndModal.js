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
    console.log(num, max)
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
    const max = Math.max(...Object.values(stats).slice(0, 6))
    console.log(Object.values(stats));

    // console.log(stats);
    return (
        <div style={{margin: "10px 0px", display: "flex", flexDirection: "column", gap: "3px"}}>
            <h2>Statistics</h2>
            <div className='dayStats'>
                <div>
                    <h2>{stats["days"]}</h2>
                    <h4>Played</h4>
                </div>
                <div>
                    <h2>{Math.round(stats["daysCorrect"] / stats["days"] * 100)}</h2>
                    <h4>Win %</h4>
                </div>
                <div>
                    <h2>{stats["fishCaught"]}</h2>
                    <h4>Fish Caught</h4>
                </div>
                <div>
                    <h2>{stats["treasure"]}</h2>
                    <h4>Treasure Obtained</h4>
                </div>
                <div>
                    <h2>{stats["perfect"]}</h2>
                    <h4>Perfect Catches</h4>
                </div>

            </div>

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

export function StatsModal(props) {
    const {onClose} = props;
    return (
        <div className="background" onClick={onClose}>
            <div className='modal' onClick={e => e.stopPropagation()}>
                <StatScreen />
                <button onClick={onClose}>Close</button>
            </div>
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
                {correct && <h1>Congratulations!</h1>}
                {!correct && <h1>Nice Try</h1>}
                <h2>{fishResults.caught ? 
                    `You caught a${/[aeiou]/.test(targetFish.name.toLowerCase()[0]) ? "n" : ""}` 
                    : `The fish was a${/[aeiou]/.test(targetFish.name.toLowerCase()[0]) ? "n" : ""}`} {targetFish.name}</h2>
                <div className="resultImages">
                    {fishResults.caught && <img src={fish_img.src} alt="🎣"/>}
                    {fishResults.treasure && <img src={treasure_img.src} alt="👑"/>}
                    {fishResults.perfect && <img src={perfect_img.src} alt="⭐"/>}
                </div>
                {daily && <hr></hr>}
                {daily && <StatScreen />}
                <hr></hr>
                <button onClick={() => {
                    setClipboardText(guessesToString(guesses, numGuess, fishResults, daily, 0, false));
                    console.log(guessesToString(guesses, numGuess, fishResults, daily, 0, false));
                }}>Copy to Clipboard</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
