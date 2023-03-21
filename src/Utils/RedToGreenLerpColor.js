export default function getRedtoGreenLerpColor(power){
    return `rgb(
        ${Math.floor((power <= 0.5) ? 255 : ((1-power) * 2 * 255))}, 
        ${Math.floor(Math.min(255, power * 2 * 255))}, 
        0)`
}