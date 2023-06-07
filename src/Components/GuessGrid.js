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
                    <div className={`fishMask ${season}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={`fishMask ${weather}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={`fishMask ${location}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={`fishMask ${time}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    {correct ? <img src={guess.img}/>
                        : <div className={`fishMask ${correct ? "green" : "gray"}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                    }
                </div>
            </div>
        )
    }
    return (
        <div className='NewRow'>
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
                <h2>Season</h2>
                <h2>Weather</h2>
                <h2>Location</h2>
                <h2>Time</h2>
                <h2>Correct</h2>
            </div>
            {guessHistory.map((guess, i) => <Row guess={guess} key={i}/>)}
        </div>
    )
}
