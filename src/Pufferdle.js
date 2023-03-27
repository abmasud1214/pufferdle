import React from 'react'

import FishingGame from './Components/FishingGame'
import './Pufferdle.css'

import fishdata from './fishdata'
import hit from './Art/hit.png'

export default function Pufferdle() {
    const [inGame, setInGame] = React.useState(0);
    const [fishResults, setFishResults] = React.useState({
        caught: false,
        treasure: false,
        perfect: false
    })

    const fishArray = fishdata.fish;
    const whichFish = fishArray[Math.floor(Math.random() * fishArray.length)]

    // console.log(whichFish.name)
    console.log(fishResults);

    const endGame = (caught, treasure, perfect) => {
        setFishResults({
            caught: caught,
            treasure: treasure,
            perfect: perfect
        })
        setInGame(false);
    }
    
    const StartGame = () => {
        setInGame(1);
        setTimeout(() => setInGame(2), 500);
    }

    return (
        <div className="pufferdle">
            {inGame == 0 && <button onClick={StartGame}>Play Pufferdle</button>}
            {inGame == 1 && <img className = "hitImage" src={hit} alt="hit"></img>}
            {inGame == 2 && <FishingGame whichFish={whichFish} endGame={endGame}/>}
        </div>
    )
}