
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import GameSetup from './components/GameSetup';
import GameProper from './components/GameProper';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/game-setup" Component={GameSetup}/>
        <Route path="/game-proper" Component={GameProper}/>
      </Routes>
    </div>
  );
}

export default App;
