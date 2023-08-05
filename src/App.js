import React from "react"

import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
    Outlet,
} from "react-router-dom";

import './App.css';
import Pufferdle from "./Pufferdle";
import FishTank from "./Components/FishTank";
import ErrorPage from "./ErrorPage";
import HelpModal from "./Components/HelpModal";

const pufferfish_src = require("./Art/pufferfish.png")
const mutant_src = require("./Art/mutant_carp.png")
const fishtank_src = require("./Art/fishtank.png")

const warptotem_src = require("./Art/farmtotem.png")
const journal_src = require("./Art/journal.png")
const notes_src = require("./Art/notes.png")
const cog_src = require("./Art/cog.png")

function RootLayout() {
    const navigate = useNavigate();
    const [showHelpModal, setShowHelpModal] = React.useState(false);

    React.useEffect(() => {
        let day = localStorage.getItem("dayInfo");
        if (day === null) {
            localStorage.setItem("dayInfo", JSON.stringify({
                mostRecentDay: new Date(2023, 8, 1),
                guesses: null,
                completed: false,
            }));
        } 
        if (localStorage.getItem("stats") === null){
            localStorage.setItem("stats", JSON.stringify({
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                "X": 0,
            }))
        }
    }, []);

    return (
        <div className="Page">
            <header>
                <div onClick={() => {navigate("/")}}>
                    <p>1</p>
                    <img src={warptotem_src} alt="Home"/>
                </div>
                {Array.from(Array(8)).map((_, index) => (<div key={index}><p>{index+2}</p></div>))}
                <div onClick={() => setShowHelpModal(true)}>
                    <p>0</p>
                    <img src={journal_src} alt="How to Play"/>
                </div>
                <div>
                    <p>-</p>
                    <img src={notes_src} alt="Statistics"/>
                </div>
                <div>
                    <p>=</p>
                    <img src={cog_src} alt="Settings"/>
                </div>
            </header>
            <div className="App">
                <Outlet/>
            </div>
            {showHelpModal && <HelpModal 
                onClose = {() => setShowHelpModal(false)}
            />}
        </div>
    )
}

function HomeElem() {
    const navigate = useNavigate();
    return (
        <div className="menuButtons">
            <div className="menuButton" onClick={() => navigate("/daily")}> 
                <img src={pufferfish_src} alt=""/> 
                <h1>Daily</h1>
            </div>
            <div className="menuButton" onClick={() => navigate("/random")}> 
                <img src={mutant_src} alt=""/> 
                <h1>Random</h1>
            </div>
            <div className="menuButton" onClick={() => navigate("/fishtank")}> 
                <img src={fishtank_src} alt=""/> 
                <h1>Fish Tank</h1>
            </div>                
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomeElem />
            },
            {
                path: "/daily",
                element: <Pufferdle daily={true} />,
            },
            {
                path: "/random",
                element: <Pufferdle daily={false}/>,
            },
            {
                path: "/fishtank",
                element: <FishTank />,
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
