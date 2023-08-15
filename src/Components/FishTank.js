import React from 'react'
import FishGrid from './FishGrid';
import fishdata from '../fishdata';

import './FishTank.css'
import FishingGame from './FishingGame';
import FishInfo from './FishInfo';

const src_troutsoup = require("../Art/food/troutsoup.png")
const src_fishtaco = require("../Art/food/fishtaco.png")
const src_dishothesea = require("../Art/food/dishothesea.png")
const src_seafoampudding = require("../Art/food/seafoampudding.png")

const src_barbedhook = require("../Art/tackles/barbedhook.png")
const src_corkbobber = require("../Art/tackles/corkbobber.png")
const src_leadbobber = require("../Art/tackles/leadbobber.png")
const src_trapbobber = require("../Art/tackles/trapbobber.png")
const src_treasurebobber = require("../Art/tackles/treasurebobber.png")

const src_goldquality = require('../Art/gold_quality.png')

function FishingLevelUnit(props) {
    const {active, major, double, onClick} = props;

    return (
        <div className={`fishingLevelUnit ${active ? double ? "double" : "active" : ""} ${major ? "major" : ""}`} onClick={onClick}>
        </div>
    )
}

export default function FishTank() {

    const [inGame, setInGame] = React.useState(0);

    // eslint-disable-next-line 
    const [fishArray, setFishArray] = React.useState(fishdata.fish.map((fish, index) => ({
        ...fish,
        src: `/fish_sprites/fish_sprite_${index+1}.png`
    })));

    const [selectedFish, setSelectedFish] = React.useState(fishArray[0]);
    const [fishingLevel, setFishingLevel] = React.useState(10);
    const [fishBarLevel, setFishBarLevel] = React.useState(10);
    const [foodLevel, setFoodLevel] = React.useState(0);
    const [tackle, setTackle] = React.useState("");
    const [restartOnPerfect, setRestartOnPerfect] = React.useState(false);
    const [showPerfect, setShowPerfect] = React.useState(false);
    const [perfectFish, setPerfectFish] = React.useState(new Set());
    
    React.useEffect(() => {
        const fishTankPreset = JSON.parse(localStorage.getItem("fishTankPreset"));
        setFishBarLevel(fishTankPreset["level"]);
        setFoodLevel(fishTankPreset["foodLevel"]);
        setFishingLevel(fishTankPreset["level"] + fishTankPreset["foodLevel"]);
        setTackle(fishTankPreset["tackle"]);
        setRestartOnPerfect(JSON.parse(localStorage.getItem("settings"))["instantRestart"]);
        setShowPerfect(JSON.parse(localStorage.getItem("settings"))["showPerfectCatches"]);
        setPerfectFish(new Set(JSON.parse(localStorage.getItem("perfectFish"))));
    }, [])

    const onFishClick = (fish) => {
        setSelectedFish(fish);
    }

    const onFishLevelClick = (level) => {
        localStorage.setItem("fishTankPreset", JSON.stringify({
            ...JSON.parse(localStorage.getItem("fishTankPreset")),
            "level": (fishBarLevel === level ? 0 : level),
        }))
        setFishBarLevel((value) => (value === level ? 0 : level));
        setFishingLevel(foodLevel + (fishBarLevel === level ? 0 : level));
    }
    
    const onFoodClick = (level) => {
        localStorage.setItem("fishTankPreset", JSON.stringify({
            ...JSON.parse(localStorage.getItem("fishTankPreset")),
            "foodLevel": (foodLevel === level ? 0 : level),
        }))
        setFoodLevel((value) => (value === level ? 0 : level));
        setFishingLevel(fishBarLevel + (level === foodLevel ? 0 : level));
    }
    
    const onTackleClick = (t) => {
        localStorage.setItem("fishTankPreset", JSON.stringify({
            ...JSON.parse(localStorage.getItem("fishTankPreset")),
            "tackle": (tackle === t ? "" : t),
        }))
        setTackle((value) => (value === t ? "" : t));
    }

    const endGame = (caught, treasure, perfect) => {
        if (!perfect && restartOnPerfect) {
            setInGame(2);
        } else {
            if (perfect) {
                setPerfectFish((prevState) => {
                    return new Set([...prevState, selectedFish.name]);
                })
            }
            setInGame(0);
        }
    }

    const startFishingGame = () => {
        setRestartOnPerfect(JSON.parse(localStorage.getItem("settings"))["instantRestart"]);
        setInGame(1);
    }

    React.useEffect(() => {
        if (inGame === 2) {
            setTimeout(() => {
                setInGame(1);
            }, 250)
        }
    }, [inGame])

    React.useEffect(() => {
        localStorage.setItem("perfectFish", JSON.stringify([...perfectFish]));
    }, [perfectFish])


    return inGame === 0 ? (
        <div className="container">
            <FishGrid fishArray={fishArray} selectedFish={selectedFish} onClick={onFishClick} info={false} perfect={showPerfect} perfectCatches={perfectFish}/>
            <div className="tankSettingsMenu">
                <div className="fishLevelBar">
                    {Array.from(Array(10)).map((_, i) => (
                        <FishingLevelUnit 
                            active={i < fishingLevel}
                            double = {(i + foodLevel >= fishingLevel && i < fishingLevel) || ((i + 10) < fishingLevel)}
                            major = {i === 4 || i === 9}
                            onClick = {() => (onFishLevelClick(i + 1))}
                            key = {i}
                        />
                    ))}
                    <h1 className={foodLevel > 0 && "foodLevelText"}>{fishingLevel}</h1>
                </div>
                <div className="foodmenu">
                    <div>
                        <img className={foodLevel === 1 && "food_selected"} onClick={() => onFoodClick(1)} src={src_troutsoup} alt={"trout soup"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 2 && "food_selected"} onClick={() => onFoodClick(2)} src={src_fishtaco} alt={"fish taco"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 3 && "food_selected"} onClick={() => onFoodClick(3)} src={src_dishothesea} alt={"dishothesea"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 4 && "food_selected"} onClick={() => onFoodClick(4)} src={src_seafoampudding} alt={"seafoam pudding"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 5 && "food_selected"} onClick={() => onFoodClick(5)} src={src_seafoampudding} alt={"gold quality seafoam pudding"}/>
                        <img className="quality" alt="" src={src_goldquality}/>
                    </div>
                </div>
                <div className="tackleMenu">
                    <img className={tackle === "barbedHook" && "tackle_selected"} onClick={() => onTackleClick("barbedHook")} src={src_barbedhook} alt="Barbed Hook"/>
                    <img className={tackle === "leadBobber" && "tackle_selected"} onClick={() => onTackleClick("leadBobber")} src={src_leadbobber} alt="Lead Bobber"/>
                    <img className={tackle === "treasureHunter" && "tackle_selected"} onClick={() => onTackleClick("treasureHunter")} src={src_treasurebobber} alt="Treasure Hunter"/>
                    <img className={tackle === "trapBobber" && "tackle_selected"} onClick={() => onTackleClick("trapBobber")} src={src_trapbobber} alt="Trap Bobber"/>
                    <img className={tackle === "corkBobber" && "tackle_selected"} onClick={() => onTackleClick("corkBobber")} src={src_corkbobber} alt="Cork Bobber"/>

                </div>
                <FishInfo fish={selectedFish} />
                <button onClick={startFishingGame}>Fish!</button>
            </div>
        </div>
    ) : (inGame === 1 &&
        <FishingGame whichFish={selectedFish} endGame={endGame} fishingLevel={fishingLevel} bobber={tackle} restartOnPerfect={restartOnPerfect}/>
    )
}
