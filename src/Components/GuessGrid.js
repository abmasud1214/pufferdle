import React from 'react'

import './GuessGrid.css'

const generic_fish = './../Art/fish.png';

function Row(props) {

    const {guess} = props;

    if (guess) {
        const {correct, season, weather, location, time, behavior, difficulty} = guess;
    
        return (
            <div className='Row'>
                <div>
                    <div className={season} style={{maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={weather} style={{maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={location} style={{maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={time} style={{maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={correct ? "green" : "gray"} style={{maskImage: `url(${guess.img})`}}></div>
                </div>
            </div>
        )
    }
    return (
        <div className='Row'>
            <div>
                <div className={"noGuess"} style={{maskImage: `url(${generic_fish})`}}></div>
            </div>
            <div>
                <div className={"noGuess"} style={{maskImage: `url(${generic_fish})`}}></div>
            </div>
            <div>
                <div className={"noGuess"} style={{maskImage: `url(${generic_fish})`}}></div>
            </div>
            <div>
                <div className={"noGuess"} style={{maskImage: `url(${generic_fish})`}}></div>
            </div>
            <div>
                <div className={"noGuess"} style={{maskImage: `url(${generic_fish})`}}></div>
            </div>
        </div>
    )
}

export default function GuessGrid(props) {
    
    const {guessHistory} = props;
    console.log(guessHistory);
    
    return (
        <div className='Grid'>
            <div className="RowNames">
                <p>Season</p>
                <p>Weather</p>
                <p>Location</p>
                <p>Time</p>
                <p>Correct</p>
            </div>
            {guessHistory.map((guess, i) => <Row guess={guess} key={i}/>)}
        </div>
    )
}
