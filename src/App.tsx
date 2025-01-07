import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import GameBoardIndex from "./pages/GameBoard/GameBoardIndex";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import Landing from "./pages/Landing/Landing";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AdminBoardNBA from "./pages/AdminBoardNBA/AdminBoardNBA";
import AdminBoardNFL from "./pages/AdminBoardNFL/AdminBoardNFL";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/game" element={<GameBoardIndex />} />

            {/* <Route path="/game/:timeStamp" element={<GameBoardIndex />}/> */}

            <Route path="/leaderboard" element={<LeaderBoard />} />

            <Route path="/adminboard/NBA" element={<AdminBoardNBA />} />

            <Route path="/adminboard/NFL" element={<AdminBoardNFL />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
