import GameRoom from "./scenes/GameRoom";
import HomePage from "./scenes/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {
  return (
    <div className="w-screen h-screen">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/game/:roomId" element={<GameRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
