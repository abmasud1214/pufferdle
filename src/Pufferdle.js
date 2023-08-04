import React from 'react'

import FishingGame from './Components/FishingGame'
import PufferdleGuess from './Components/PufferdleGuess'
import './Pufferdle.css'

import fishdata from './fishdata'

import { useOutletContext } from "react-router-dom";

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
            date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
            // console.log(date);
            var seedrandom = require('seedrandom')
            var rng = seedrandom(date)
            const fishChoice = fishArray[Math.floor(rng() * fishArray.length)]
            // console.log(fishChoice)
            setTargetFish(fishChoice)

            const day = JSON.parse(localStorage.getItem("dayInfo"))

            // if (dayInfo.mostRecentDay)
            const mrd = new Date(day.mostRecentDay);
            const d = new Date();
    
            if (!(mrd.getDate() === d.getDate() && mrd.getMonth() === d.getMonth() &&
                    mrd.getFullYear() === d.getFullYear())) {
                const newDayInfo = {
                    mostRecentDay: d,
                    guesses: [...Array(6)],
                    completed: false
                };
                localStorage.setItem("dayInfo", JSON.stringify(newDayInfo));
                setInGame(1);
            } else {
                setInGame(2);
            }
        } else {
            setInGame(1);
        }
        // console.log("useEffectrun")
    }, [daily, fishArray])

    const endGame = (caught, treasure, perfect) => {
        setFishResults({
            caught: caught,
            treasure: treasure,
            perfect: perfect
        })
        setInGame(2);
    }

    return (
        <div className="pufferdle">
            {inGame === 1 && <FishingGame whichFish={targetFish} endGame={endGame}/>}
            {inGame === 2 && <PufferdleGuess fishResults={fishResults} targetFish={targetFish}/>}
        </div>
    )
}