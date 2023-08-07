import React from 'react'
import "./HelpModal.css"

export default function HelpModal(props) {

    const {onClose} = props;

    const [showAgain, setShowAgain] = React.useState(JSON.parse(localStorage.getItem("settings"))["showHelpAtStart"]);

    const handleChange = () => {
        localStorage.setItem("settings", JSON.stringify({
            ...JSON.parse(localStorage.getItem("settings")),
            showHelpAtStart: !showAgain,
        }))
        setShowAgain(!showAgain);
    }

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

                <hr></hr>
                <div className="helpSetting">
                    <div style={{
                        height: "20px", 
                        width: "20px", 
                        "backgroundColor": "#dc7b05",
                        border: "solid 2px",
                        borderColor: "#e6a61c #e6a61c #5b2b2a #5b2b2a",
                        display: "flex",
                        alignItems: "center",
                        "justifyContent": "center"}}
                        onClick={handleChange}>
                        {showAgain && <div style={{
                            height: "10px", 
                            width: "10px", 
                            "backgroundColor": "#598f0a",
                            border: "solid 2px",
                            borderColor: "#d3e720 #d3e720 #1e5511 #1e5511"}}></div>}
                    </div>
                    <h3>Show help before game begins</h3>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}