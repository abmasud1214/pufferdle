import React from 'react'

import FishingGame from './Components/FishingGame'
import PufferdleGuess from './Components/PufferdleGuess'
import './Pufferdle.css'

import fishdata from './fishdata'

export default function Pufferdle() {
    const [inGame, setInGame] = React.useState(0);
    const [fishResults, setFishResults] = React.useState({
        caught: false,
        treasure: false,
        perfect: false
    })
    const fishArray = fishdata.fish;
    const [targetFish, setTargetFish] = React.useState(fishArray[Math.floor(Math.random() * fishArray.length)]);

    // const whichFish = fishArray.filter(value => (value.name === "Angler"))[0]

    // console.log(whichFish.name)
    // console.log(fishResults);

    const endGame = (caught, treasure, perfect) => {
        setFishResults({
            caught: caught,
            treasure: treasure,
            perfect: perfect
        })
        setInGame(2);
    }
    
    const StartGame = () => {
        setInGame(1);
    }

    return (
        <div className="pufferdle">
            {inGame == 0 && <button onClick={StartGame}>Play Pufferdle</button>}
            {inGame == 1 && <FishingGame whichFish={targetFish} endGame={endGame}/>}
            {inGame == 2 && <PufferdleGuess fishResults={fishResults} targetFish={targetFish}/>}
        </div>
    )
}