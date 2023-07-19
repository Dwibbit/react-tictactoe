import { useEffect, useState } from "react"
import TTTile from "./TTTTile";

export default function TTTGrid({ currSymbol, swapPlayer, reset, afterReset }) {

    const [grid, setGrid] = useState(new Array(9).fill('-'));
    const [gameDone, setGameDone] = useState(false);
    const resultChecker = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    useEffect(() => {
        if(reset)
            resetGrid();
    }, [reset])

    const updateGrid = async (index) => {
        const updatedGrid = [...grid];
        updatedGrid[index] = currSymbol;
        setGrid(updatedGrid);
        let result = evaluate(updatedGrid);
        swapPlayer(result);

        if(result > -1) 
            setGameDone(true);
    }

    const evaluate = (updated) => {
        let winner = 0;
        resultChecker.forEach(line => {
            if(updated[line[0]] == 'O' && updated[line[1]] == 'O' && updated[line[2]] == 'O') {
                winner = 1;
            }
        });
        resultChecker.forEach(line => {
            if(updated[line[0]] == 'X' && updated[line[1]] == 'X' && updated[line[2]] == 'X') {
                winner = 2;
            }
        });
        if(winner>0)
            return winner;
        if(!updated.find(s => s === '-'))
            return 0;
    }

    const resetGrid = () => {
        const gridWipe = new Array(9).fill('-');
        setGrid(gridWipe);
        setGameDone(false);
        afterReset();
    }

    return (
        <div className="tictactoe-grid">
            {grid.map((tile, index) => (<TTTile key={index} symbol={currSymbol} tile={tile} index={index} placedTile={updateGrid} gameDone={gameDone}></TTTile>))}
        </div>
    )
}