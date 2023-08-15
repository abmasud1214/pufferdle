import React from 'react'

import './GuessGrid.css'

const generic_fish = './../Art/fish.png';

export function Row(props) {

    const {guess, skip} = props;

    if (guess) {
        // behavior and difficulty not used in case they will be used in future.
        // eslint-disable-next-line 
        const {correct, season, weather, location, time, behavior, difficulty} = guess;
    
        return (
            <div className='Row'>
                <div>
                    <div className={`fishMask ${season} ${skip ? "skipAnim" : ""}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={`fishMask ${weather} ${skip ? "skipAnim" : ""}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={`fishMask ${location} ${skip ? "skipAnim" : ""}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    <div className={`fishMask ${time} ${skip ? "skipAnim" : ""}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
                </div>
                <div>
                    {correct ? <img className={`${skip ? "skipAnim" : ""}`} src={guess.img} alt="🟩"/>
                        : <div className={`fishMask ${correct ? "green" : "gray"} ${skip ? "skipAnim" : ""}`} style={{WebkitMaskImage: `url(${guess.img})`, maskImage: `url(${guess.img})`}}></div>
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
    
    const {guessHistory, skip} = props;
    // console.log(guessHistory);
    
    return (
        <div className='Grid'>
            <div className="RowNames">
                <h2>Season</h2>
                <h2>Weather</h2>
                <h2>Location</h2>
                <h2>Time</h2>
                <h2>Correct</h2>
            </div>
            {guessHistory.map((guess, i) => <Row guess={guess} skip={skip[i]} key={i}/>)}
        </div>
    )
}
