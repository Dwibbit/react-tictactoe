

export default function TTTile({ symbol, tile, index, placedTile, gameDone }) {

    const fillClick = () => {
        placedTile(index);
    }

    const ifGameDone = () => {
        if(gameDone)
            return "done";
    }

    return ( 
        tile === '-' ? <div className={"tile hidden " + ifGameDone()} onClick={fillClick}>{symbol}</div> : <div className={"tile " +ifGameDone()}>{tile}</div>
    )
}