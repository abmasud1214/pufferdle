import React from 'react';
import "./HelpModal.css";

import { ToggleButton } from './SettingsModal.js';
import { formatGuess } from "../Utils/GuessFormat.js";
import { Row } from './GuessGrid.js';
import fishdata from "../fishdata.js";

const fish_sprites_src = fishdata.fish.map((_, index) => {
    return require(`./../Art/fish_sprites/fish_sprite_${index+1}.png`)
})

export default function HelpModal(props) {

    const {onClose} = props;

    let fishArray = fishdata.fish;
    
    fishArray = fishArray.map((fish, index) => ({
        ...fish,
        src: fish_sprites_src[index],
    }));

    const [showAgain, setShowAgain] = React.useState(JSON.parse(localStorage.getItem("settings"))["showHelpAtStart"]);

    const handleChange = () => {
        localStorage.setItem("settings", JSON.stringify({
            ...JSON.parse(localStorage.getItem("settings")),
            showHelpAtStart: !showAgain,
        }))
        setShowAgain(!showAgain);
    }

    const rowFromFishNames = (fish1, fish2) => {
        const f1 = fishArray.filter(value => (value.name === fish1))[0];
        const f2 = fishArray.filter(value => (value.name === fish2))[0];
        const formattedGuess = formatGuess(f1, f2);
        return (<Row guess={formattedGuess} skip={true}/>)
    }

    return (
        <div className='background' onClick={onClose} >
            <div className="helpModal" onClick={e => e.stopPropagation()}> 
                <div className='helpInfo'>
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

                    <h2>Example Game</h2>
                    <div className="RowNames">
                        <h2>Season</h2>
                        <h2>Weather</h2>
                        <h2>Location</h2>
                        <h2>Time</h2>
                        <h2>Correct</h2>
                    </div>
                    {rowFromFishNames("Pufferfish", "Stonefish")}
                    <ul>
                        <li>The guess was Pufferfish</li>
                        <li>Season: Yellow → The target fish can be caught in summer, but also in other seasons.</li>
                        <li>Weather: Yellow → The target fish can be caught in the sun, but also in other types of weather.</li>
                        <li>Location: Gray → The target fish cannot be caught in the ocean OR the Ginger Island ocean.</li>
                        <li>Time: Yellow → The target fish can be caught at some or all times between 12PM and 4PM.</li>
                    </ul>
                    {rowFromFishNames("Largemouth Bass", "Stonefish")}
                    <ul>
                        <li>The guess was Largemouth Bass</li>
                        <li>Season: Green → The target fish can be caught in any season.</li>
                        <li>Weather: Green → The target fish can be caught in any weather.</li>
                        <li>Time: Yellow → The target fish can be caught at some or all times between 6AM and 7PM.</li>

                    </ul>
                    {rowFromFishNames("Lava Eel", "Stonefish")}
                    <ul>
                        <li>The guess was Lava Eel</li>
                        <li>Location: Yellow → The target fish can be caught in the mines and/or the volcano caldera and possibly some other places.</li>
                        <li>Time: Green → The target fish can be caught in any time.</li>
                    </ul>
                    {rowFromFishNames("Ice Pip", "Stonefish")}
                    <ul>
                        <li>The guess was Ice Pip</li>
                        <li>Location: Green → The target fish can only be caught in the mines.</li>
                        <li>Correct: Gray → While everything else is correct, the fish is NOT an Ice Pip.</li>
                    </ul>
                    {rowFromFishNames("Stonefish", "Stonefish")}
                    <ul>
                        <li>The correct fish was a Stonefish</li>
                    </ul>
                    <h2>Note</h2>
                    <ul>
                        <li>If a fish can <i>also</i> be caught at the Ginger Island, seasons will only be based on their <b>non</b> Ginger Island locations. 
                            (e.g. Pufferfish is only a summer fish.) </li>
                    </ul>
                </div>
                <hr></hr>
                <div className="helpSetting">
                    <ToggleButton onClick={handleChange} toggle={showAgain} />
                    <h3>Show help before game begins</h3>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}