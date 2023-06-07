import React from "react"
import ReactDOM from "react-dom/client"

import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

import './App.css';
import Pufferdle from "./Pufferdle";
import FishTank from "./Components/FishTank";
import ErrorPage from "./ErrorPage";

const pufferfish_src = require("./Art/pufferfish.png")
const mutant_src = require("./Art/mutant_carp.png")
const fishtank_src = require("./Art/fishtank.png")

function RootElem() {
    const navigate = useNavigate();
    return (
        <div className="menuButtons">
            <div className="menuButton"> 
                <img src={pufferfish_src} alt="/"/> 
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
        element: <RootElem />,
        errorElement: <ErrorPage />,
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
    }
]);

function App() {

    const [inGame, setInGame] = React.useState(0);

    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
