import React from 'react'

import FishingGame from './Components/FishingGame'
import PufferdleGuess from './Components/PufferdleGuess'
import './Pufferdle.css'

import fishdata from './fishdata'

export default function Pufferdle({ daily }) {
    const [inGame, setInGame] = React.useState(0);
    const [fishResults, setFishResults] = React.useState({
        caught: false,
        treasure: false,
        perfect: false
    })
    const fishArray = fishdata.fish;
    const [targetFish, setTargetFish] = React.useState(fishArray[Math.floor(Math.random() * fishArray.length)]);
    // const [targetFish, setTargetFish] = React.useState(fishArray.filter(value => (value.name === "Stonefish"))[0]);

    // const whichFish = fishArray.filter(value => (value.name === "Angler"))[0]

    // console.log(whichFish.name)
    // console.log(fishResults);

    React.useEffect(() => {
        console.log(targetFish);
        if (daily) {
            var seedrandom = require('seedrandom')
            var rng = seedrandom(new Date().toDateString())
            const fishChoice = fishArray[Math.floor(rng() * fishArray.length)]
            console.log(new Date().toDateString())
            console.log(fishChoice)
            setTargetFish(fishChoice)
        }
    }, [])

    const endGame = (caught, treasure, perfect) => {
        setFishResults({
            caught: caught,
            treasure: treasure,
            perfect: perfect
        })
        setInGame(1);
    }

    return (
        <div className="pufferdle">
            {inGame == 0 && <FishingGame whichFish={targetFish} endGame={endGame}/>}
            {inGame == 1 && <PufferdleGuess fishResults={fishResults} targetFish={targetFish}/>}
        </div>
    )
}