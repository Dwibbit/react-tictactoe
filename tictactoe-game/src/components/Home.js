import '../App.css';
import { Link } from 'react-router-dom';
import { getAllData } from '../services/GameDataService';
import { useEffect, useState, useLayoutEffect } from 'react';

export default function Home() {

  const [isFetched, setIsFetched] = useState(false);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    getAllData().then((data) => {
      setSavedData(data.reverse());
    });
    const fetchData = async () => {
      try {
        const result = await getAllData();
        setSavedData(result.reverse());
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(savedData.length>0) {
      setIsFetched(true);
      console.log(savedData);
    }
  }, [savedData])

  return (
    <div className="App">
      <header className="App-home">
        <h1 style={{margin: "0px", fontSize: "250px", fontWeight: "200"}}>O#X</h1>
        <Link
          style={{fontSize: "150%"}}
          className="App-link"
          to="game-setup">
          Click to play Tic Tac Toe!
        </Link>
          <p>Previous Games</p>
        { 
          isFetched ?
          <table className='table'>
            <thead>
              <tr>
                <th>Player 1</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Player 2</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
              </tr>
            </thead>
            <tbody>
              { savedData.map(rowData => (
                <tr>
                  <td>{rowData.playerOneName}</td>
                  <td>{rowData.playerOneWins}</td>
                  <td>{rowData.playerOneLosses}</td>
                  <td>{rowData.playerTwoName}</td>
                  <td>{rowData.playerTwoWins}</td>
                  <td>{rowData.playerTwoLosses}</td>
                  <td>{rowData.draws}</td>
                </tr>
              ))}
            </tbody>
          </table> : <></>
        }
      </header>
    </div>
  );
}