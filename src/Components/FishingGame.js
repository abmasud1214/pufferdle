import React from "react"
import ReactDOM from 'react-dom/client'

import './FishingGame.css'
import getRedtoGreenLerpColor from "../Utils/RedToGreenLerpColor";

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

export default function FishingGame(props){

    const canvasRef = React.useRef(null);
    
    const {whichFish} = props;

    const difficulty = whichFish.difficulty;
    const typeStr = whichFish.behavior;
    let motionType;
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

    let fishPos = 254; // Original: 254; Min: 6 -> Max: 269;
    let fishTargetPos = ((100 - difficulty) / 100) * 274; 
    
    let fishAcceleration;
    let fishSpeed = 0;

    const update = (time) => {
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
    }

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.drawImage(fishing_menu, 0, 0, fishing_menu.naturalWidth, fishing_menu.naturalHeight)
        
        ctx.globalAlpha = transparency ? 0.6 : 1;

        ctx.fillStyle = '#216501'
        ctx.fillRect(33, ypos+2, 18, length-4);
        ctx.fillStyle = '#82E500'
        ctx.fillRect(35, ypos+4, 14, length-8);
        ctx.fillStyle = '#49c100'
        ctx.fillRect(35, ypos, 14, 2);
        ctx.fillStyle = '#baff59'
        ctx.fillRect(35, ypos+2, 14, 2);
        ctx.fillStyle = '#49c100'
        ctx.fillRect(35, ypos+length-4, 14, 2);
        ctx.fillStyle = '#216501'
        ctx.fillRect(35, ypos+length-2, 14, 2);

        ctx.globalAlpha = 1;

        ctx.fillStyle = getRedtoGreenLerpColor(progress)

        ctx.fillRect(63, 292-(progress*288), 7, (progress*288))

        ctx.drawImage(treasure_img, 32, 90, treasure_img.naturalWidth, treasure_img.naturalHeight)
        
        ctx.drawImage(fish_img, 32, fishPos, fish_img.naturalWidth, fish_img.naturalHeight)
    }

    React.useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        let perfect = true;

        // const render = () => {
        //     draw(context)
        //     // context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    
        //     // // context.fillStyle = '#000000'
        //     // // context.fillRect(0, 0, context.width, context.canvas.height);
        //     // // context.drawImage(fishing_menu, 0, 0, 47*3, 150*3)
    
        //     // // context.drawImage(fish_img, 50, 100, 30, 30)

        //     requestAnimationFrame(render)
        // }

        // render()
        MainLoop.setUpdate(update).setDraw(() => draw(context)).start();

    }, [])

    return (
        <div>
            <canvas ref={canvasRef} width={fishing_menu.naturalWidth} height={fishing_menu.naturalHeight}>
            </canvas>
        </div>
    )
}