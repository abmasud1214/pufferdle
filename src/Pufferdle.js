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

    React.useEffect(() => {
        if (daily) {
            let date = new Date()
            date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
            // fetch('https://httpstat.us/400')
            fetch('http://worldtimeapi.org/api/ip')
                .then((r) => r.json())
                .then((data) => {
                    date = data.datetime.slice(0, 10);
                })
                .catch(
                    (err) => {
                        console.log("Error Request")
                    }
                )
                .then( () => {
                    var seedrandom = require('seedrandom')
                    var rng = seedrandom(date)
                    const fishChoice = fishArray[Math.floor(rng() * fishArray.length)]
                    // console.log(fishChoice)
                    setTargetFish(fishChoice)
                })
        }
        // console.log("useEffectrun")
    }, [daily, fishArray])

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
            {inGame === 0 && <FishingGame whichFish={targetFish} endGame={endGame}/>}
            {inGame === 1 && <PufferdleGuess fishResults={fishResults} targetFish={targetFish}/>}
        </div>
    )
}