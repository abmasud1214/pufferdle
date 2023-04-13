import React from 'react'

import "./EndModal.css"

const fish_img = new Image();
fish_img.src = require('./../Art/fish.png')

const treasure_img = new Image();
treasure_img.src = require('./../Art/treasurechest.png')

const perfect_img = new Image();
perfect_img.src = require('./../Art/perfect.png')

export default function EndModal(props) {

    const { targetFish, fishResults, correct, daily, onClose } = props;

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
                    <button>Copy to Clipboard</button>
                </div>
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
