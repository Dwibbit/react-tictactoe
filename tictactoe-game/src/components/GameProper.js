import { useEffect, useRef, useState } from "react"
import { useLocation, Link } from "react-router-dom";
import { postGameData } from "../services/GameDataService";
import TTTGrid from "./TTTGrid"
import '../App.css';

export default function GameProper() {

    let { state } = useLocation();
    const [currPlayer, setCurrPlayer] = useState(1);
    const [endText, setEndText] = useState('');
    const [gameDone, setGameDone] = useState(false);
    const [toReset, setToReset] = useState(false);
    const p1Wins = useRef(0);
    const p2Wins = useRef(0);
    const draws = useRef(0);
    const rounds = useRef(0);

    const swapPlayer = (result) => {
        if(result > -1) {
            setGameDone(true);
            if(result == 0) {
                setEndText("Round Draw!");
                draws.current = draws.current+1
            }
            if(result == 1) {
                setEndText("The winner is Player 1: " + state.p1Name);
                p1Wins.current = p1Wins.current+1
            }
            if(result == 2) {
                setEndText("The winner is Player 2: " + state.p2Name);
                p2Wins.current = p2Wins.current+1
            }
            rounds.current = rounds.current+1;
            return;
        }
        if(currPlayer == 1)
            setCurrPlayer(2);
        if(currPlayer == 2)
            setCurrPlayer(1);
    }

    const handleResetGrid = () => {
        setToReset(true);
    }

    const afterReset = () => {
        setToReset(false);
        setGameDone(false);
        setCurrPlayer(1);
    }

    const deactivatedLink = () => {
        if (!gameDone)
            return "unaccessible-link";
        return "";
    }

    const saveData = async () => {
        const toSaveData = {
            playerOneName: state.p1Name,
            playerOneWins: p1Wins.current,
            playerOneLosses: rounds.current-p1Wins.current,
            playerTwoName: state.p2Name,
            playerTwoWins: p2Wins.current,
            playerTwoLosses: rounds.current-p2Wins.current,
            draws: draws.current,
            date: Date.now()
        }
        await postGameData(toSaveData);
    }

    return (
        <div className="App-header">
            {gameDone ? <h4 style={{margin : "0%"}}>Round Over!</h4> : <h4 style={{margin : "0%"}}>Welcome {state.p1Name} & {state.p2Name} </h4>}
            {gameDone ? <h3>{endText}</h3> : <h3>Current Player: {currPlayer == 1 ? state.p1Name : state.p2Name} </h3>}
            <TTTGrid currPlayer={currPlayer} currSymbol={currPlayer == 1 ? 'O' : 'X'} swapPlayer={swapPlayer} reset={toReset} afterReset={afterReset}/>

            <p>Player 1 Wins: <b>{p1Wins.current}</b> | Player 2 Wins: <b>{p2Wins.current}</b> | Draws: <b>{draws.current}</b></p>
            <div className='app-links' style={{marginTop : "1%"}}>
                <a className={"App-link " + deactivatedLink()} onClick={handleResetGrid}>Continue</a>
                <Link
                    className={"App-link " + deactivatedLink()}
                    to="/"
                    onClick={saveData}>
                    Stop
                </Link>
            </div>
        </div>
    )
}