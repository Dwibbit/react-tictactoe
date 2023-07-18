import '../App.css';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function GameSetup() {

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [validInputs, setValidInputs] = useState(false);

    useEffect(() => {
        checkNames();
    }, [player1, player2])

    const player1Entry = (e) => {
        setPlayer1(e.target.value);
    }

    const player2Entry = (e) => {
        setPlayer2(e.target.value);
    }

    const deactivatedLink = () => {
        if (!validInputs)
            return "disabled-link";
    }

    const showTooltip = () => {
        if (!validInputs)
            return "tooltip";
    }

    const checkNames = (p1, p2) => {
        if((player1.trim() == "" && player2.trim() == ""))
            setValidInputs(false)
        else if(player1 === player2)
            setValidInputs(false)
        else if((player1.trim() == "" || player2.trim() == ""))
            setValidInputs(false)
        else
            setValidInputs(true);
    }
 
    return (
        <div className="App-header">
            <h2>Enter Player Names</h2>
            <div className='name-inputs'>
                <div><p>Player 1: O</p><input className='name-input-field' onChange={player1Entry} value={player1} type="text"></input></div>
                <div><p>Player 2: X</p><input className='name-input-field' onChange={player2Entry} value={player2} type="text"></input></div>
            </div>
            <div className='app-links'>
                <Link
                    className="App-link"
                    to="/">
                    Back to Home
                </Link>
                <div className={showTooltip()}>
                    <Link
                        className={"App-link " + deactivatedLink()}
                        to="/game-proper"
                        state={{p1Name: player1, p2Name: player2}}>
                        Start Game
                    </Link>
                    <span className="tooltip-text">Please enter unique player names</span>
                </div>
            </div>
        </div>
    )
}