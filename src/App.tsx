import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import GameBoardIndex from "./pages/GameBoard/GameBoardIndex";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GameBoardIndex />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
