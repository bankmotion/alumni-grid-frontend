import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import GameBoardIndex from "./pages/GameBoard/GameBoardIndex";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import Landing from "./pages/Landing/Landing";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AdminBoardNBA from "./pages/AdminBoardNBA/AdminBoardNBA";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/game" element={<GameBoardIndex />}></Route>
            <Route path="/leaderboard" element={<LeaderBoard />}></Route>
            <Route path="/adminboard/NBA" element={<AdminBoardNBA />}></Route>
            {/* <Route path="/adminboard/NFL" element={<AdminBoardNFL />}></Route> */}
            <Route path="/" element={<Landing />}></Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
