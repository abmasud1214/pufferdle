import React from 'react'
import "./HelpModal.css"

export default function HelpModal(props) {

    const {onClose} = props;

    return (
        <div className='background' onClick={onClose} >
            <div className="helpModal" onClick={e => e.stopPropagation()}> 
                <h1>How to Play</h1>
                <h1 style={{fontFamily: "SVThin", margin: "0px 0px 10px 0px"}}>Guess the Fish in 6 tries</h1>

                <h2>Catching the Fish</h2>
                <ul>
                    <li>First try to catch the fish. Click to raise bar, release to lower bar, keep the bar behind the fish!</li>
                    <li>Whether or not you catch the fish, use the difficulty to try and guess it in 6 tries.</li>
                </ul>

                <h2>Guessing</h2>
                <ul>
                    <li>After each guess, the color of the tiles will change based on how each trait matches to the target fish.</li>
                    <li>Traits: Season, Weather, Location, Time</li>
                    <li>If the color is green, the fish you guessed exactly matches the target fish in that trait.</li>
                    <li>If the color is yellow, there is some overlap between both fish, but not an exact match.</li>
                    <li>If the color is gray, there is no overlap at all.</li>
                </ul>

                <h2>Examples</h2>

            </div>
        </div>
    )
}