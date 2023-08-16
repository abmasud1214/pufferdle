import React from "react";

import "./NavbarModal.css"

const warptotem_src = require(".././Art/farmtotem.png")
const journal_src = require(".././Art/journal.png")
const notes_src = require(".././Art/notes.png")
const cog_src = require(".././Art/cog.png")

export default function NavbarModal(props) {

    const {onClose} = props;

    return (
        <div className='background' onClick={onClose} >
            <div className="navBarModal" onClick={e => e.stopPropagation()}> 
                <img src={warptotem_src} alt="Warp Totem"/>
                <h2>Home</h2>
                <img src={journal_src} alt="Journal Book"/>
                <h2>How to Play</h2>
                <img src={notes_src} alt="Secret Note"/>
                <h2>Statistics</h2>
                <img src={cog_src} alt="Cog"/>
                <h2>Settings</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}