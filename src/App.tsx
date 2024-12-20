import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import GameBoardIndex from "./pages/GameBoard/GameBoardIndex";
import Landing from "./pages/Landing/Landing";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/game" element={<GameBoardIndex />}></Route>
            <Route path="/" element={<Landing />}></Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
