import React from "react"
import ReactDOM from 'react-dom/client'

import './FishingGame.css'
import getRedtoGreenLerpColor from "../Utils/RedToGreenLerpColor";
import hitimg from ".././Art/hit.png"

const fishing_menu = new Image();
fishing_menu.src = require('./../Art/fishing_menu.png')

const fish_img = new Image();
fish_img.src = require('./../Art/fish.png')

const treasure_img = new Image();
treasure_img.src = require('./../Art/treasure.png')

const MainLoop = require('mainloop.js')

function randRange(low, high){
    return Math.floor(Math.random() * (high-low)) + low;
}

function Game(props){

    const canvasRef = React.useRef(null);
    
    const {whichFish, endGame} = props;

    const difficulty = whichFish.difficulty;
    const typeStr = whichFish.behavior;
    let motionType;

    let mouseDown = false;

    React.useEffect(() => {
        const handleMouseUp = (event) => {mouseDown = false};
        const handleMouseDown = (event) => {mouseDown = true};

        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousedown", handleMouseDown);
        }
    }, [])

    switch(typeStr){
        case "Mixed":
            motionType = 0;
            break;
        case "Dart":
            motionType = 1;
            break;
        case "Smooth":
            motionType = 2;
            break;
        case "Floater":
            motionType = 4;
            break;
        case "Sinker":
            motionType = 3;
            break;
    }

    const playerLevel = 10;
    let length = 48 + 4*playerLevel;
    let ypos = 288 - length; // Min: 6 -> Max: 288 - length;
    let transparency = false;
    let progress = 0.3;
    let barSpeed = 0;
    let barShake = [0, 0];

    let fishPos = 254; // Original: 254; Min: 6 -> Max: 269;
    let fishTargetPos = ((100 - difficulty) / 100) * 274; 
    let fishShake = [0, 0]

    let fishAcceleration;
    let fishSpeed = 0;

    let treasureAppearTimer = randRange(1000, 3000);
    let treasurePosition;
    let treasureCaught = false;
    let treasureCatchLevel = 0;
    let treasureShake = [0, 0];

    let perfect = true;

    const update = (time) => {
        if (progress >= 1) {
            MainLoop.stop();
            console.log(whichFish.name);
            setTimeout(()=>endGame(true, treasureCaught, perfect), 250);
        } else if (progress <= 0) {
            MainLoop.stop();
            setTimeout(()=>endGame(false, false, false), 250);
        }

        if (Math.random() < (difficulty * ((motionType != 2) ? 1 : 20) / 4000) && (motionType != 2 || fishTargetPos == -1))
        {
            const spaceBelow = 274 - fishPos;
            const spaceAbove = fishPos;
            const percent = Math.min(99, difficulty + randRange(10, 45)) / 100;
            fishTargetPos = fishPos + randRange(Math.min(0-spaceAbove, spaceBelow), spaceBelow) * percent;
        }
        let floaterSinkerAcceleration = 0;
        if (motionType == 4) {
            floaterSinkerAcceleration = Math.max(floaterSinkerAcceleration - 0.01, -1.5);
        }
        else if (motionType == 3) {
            floaterSinkerAcceleration = Math.min(floaterSinkerAcceleration + 0.01, 1.5);
        }
        if (Math.abs(fishPos - fishTargetPos) > 3 && fishTargetPos != -1) {
            fishAcceleration = (fishTargetPos - fishPos) / (randRange(10, 30) + (100 - Math.min(100, difficulty)));
            fishSpeed += (fishAcceleration - fishSpeed) / 5;
        } 
        else if (motionType != 2 && Math.random() < (difficulty / 2000)) {
            fishTargetPos = fishPos + ((Math.random() < 0.5) ? randRange(-100, 51) : randRange(50, 101));
        } 
        else {
            fishTargetPos = -1;
        }

        if (motionType == 1 && Math.random() < (difficulty / 1000)) {
            fishTargetPos = fishPos + ((Math.random() < 0.5) ? randRange(-100 - difficulty * 2, -51) : randRange(50, 101 + difficulty * 2));
        }
        fishTargetPos = Math.max(-1, Math.min(fishTargetPos, 274));
        fishPos += fishSpeed + floaterSinkerAcceleration;

        if (fishPos > 269){
            fishPos = 269;
        } else if (fishPos < 0) {
            fishPos = 0;
        }

        const bobberInBar = ((fishPos + 6 <= ypos - 16 + length) && (fishPos - 8 >= ypos - 16)) || ((fishPos >= 274 - length) && (ypos >= 284 - length - 4));
        
        const wasDown = mouseDown;
        let gravity = (mouseDown ? (-0.125) : 0.125);
        // console.log(mouseDown, gravity, ypos, barSpeed);
        if (mouseDown && gravity < 0 && (ypos == 6 || ypos == (288 - length))){
            barSpeed = 0;
        }
        if (bobberInBar) {
            gravity *= 0.6;
        }
        const oldPos = ypos;
        barSpeed += gravity;
        ypos += barSpeed;
        
        if (ypos + length > 288) {
            ypos = 288 - length;
            barSpeed = (0 - barSpeed) * 2 / 3;
        } else if (ypos < 6) {
            ypos = 6;
            barSpeed = (0 - barSpeed) * 2 / 3;
        }


        
        let treasureInBar = false;
        const oldTreasureAppearTimer = treasureAppearTimer
        treasureAppearTimer -= time;
        // console.log(treasureAppearTimer)
        if (!treasureCaught) {
            if (treasureAppearTimer < 0) {
                if (oldTreasureAppearTimer > 0){
                    treasurePosition = ((ypos > 137) ? randRange(8, ypos - 20) : randRange(Math.min(274, ypos + length), 250)); 
                }
                treasureInBar = (treasurePosition + 6 <= ypos - 16 + length) && (treasurePosition - 8 >= ypos - 32);
                if (treasureInBar) {
                    treasureCatchLevel += 0.0135;
                    treasureShake = [randRange(-2, 3) / 2, randRange(-2, 3) / 2];
                    if (treasureCatchLevel >= 1) {
                        treasureCaught = true;
                    }
                } else {
                    treasureShake = [0, 0];
                    treasureCatchLevel = Math.max(0, treasureCatchLevel - 0.01);
                }
            }
        }
        
        if (bobberInBar) {
            progress += 0.002;
            fishShake[0] = randRange(-10, 11) / 20;
            fishShake[1] = randRange(-10, 11) / 20;
            barShake = [0, 0];
            transparency = false;
        } else if (!treasureInBar || treasureCaught || true) {
            if (perfect) {
                perfect = false;
            }
            progress -= 0.003;
            progress = Math.max(0, progress);
            barShake[0] = randRange(-10, 11) / 20;
            barShake[1] = randRange(-10, 11) / 20;
            fishShake = [0, 0];
            transparency = true;
        }
    }

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.drawImage(fishing_menu, 0, 0, fishing_menu.naturalWidth, fishing_menu.naturalHeight)
        
        ctx.globalAlpha = transparency ? 0.6 : 1;

        ctx.fillStyle = '#216501'
        ctx.fillRect(33 + barShake[0], ypos+2 + barShake[1], 18, length-4);
        ctx.fillStyle = '#82E500'
        ctx.fillRect(35 + barShake[0], ypos+4 + barShake[1], 14, length-8);
        ctx.fillStyle = '#49c100'
        ctx.fillRect(35 + barShake[0], ypos + barShake[1], 14, 2);
        ctx.fillStyle = '#baff59'
        ctx.fillRect(35 + barShake[0], ypos+2 + barShake[1], 14, 2);
        ctx.fillStyle = '#49c100'
        ctx.fillRect(35 + barShake[0], ypos+length-4 + barShake[1], 14, 2);
        ctx.fillStyle = '#216501'
        ctx.fillRect(35 + barShake[0], ypos+length-2 + barShake[1], 14, 2);

        ctx.globalAlpha = 1;

        const displayProgress = Math.min(progress, 1)

        ctx.fillStyle = getRedtoGreenLerpColor(displayProgress)

        ctx.fillRect(63, 292-(displayProgress*288), 7, (displayProgress*288))

        if (treasureAppearTimer < 0 && !treasureCaught){
            ctx.drawImage(treasure_img, 32 + treasureShake[0], treasurePosition + 12 + treasureShake[1], treasure_img.naturalWidth, treasure_img.naturalHeight)
            if (treasureCatchLevel > 0) {
                ctx.fillStyle = 'rgba(105,105,105,0.5)';
                ctx.fillRect(33, treasurePosition, 18, 4);
                ctx.fillStyle = 'rgb(255, 165, 0)';
                ctx.fillRect(33, treasurePosition, (treasureCatchLevel * 18), 4);
            }
        }
        
        ctx.drawImage(fish_img, 32 + fishShake[0], fishPos + fishShake[1], fish_img.naturalWidth, fish_img.naturalHeight)
    }

    React.useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        MainLoop.setUpdate(update).setDraw(() => draw(context)).start();

    }, [])

    return (
        <div>
            <canvas ref={canvasRef} width={fishing_menu.naturalWidth} height={fishing_menu.naturalHeight}>
            </canvas>
        </div>
    )
}

export default function FishingGame(props){

    const [hit, setHit] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setHit(false);
        }, 500)
    }, [])

    return (
        <>
            {hit && <img className = "hitImage" src={hitimg} alt="hit"></img>}
            {!hit && <Game {...props}/>}
        </>
    )

}