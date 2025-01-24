import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import GameBoardIndex from "./pages/GameBoard/GameBoardIndex";
import Landing from "./pages/Landing/Landing";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AdminBoardNBA from "./pages/AdminBoardNBA/AdminBoardNBA";
import AdminBoardNFL from "./pages/AdminBoardNFL/AdminBoardNFL";
import { PlayType } from "./constant/const";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/game/nba"
              element={<GameBoardIndex playType={PlayType.NBA} />}
            />

            <Route
              path="/game/nfl"
              element={<GameBoardIndex playType={PlayType.NFL} />}
            />

            <Route path="/adminboard/NBA" element={<AdminBoardNBA />} />

            <Route path="/adminboard/NFL" element={<AdminBoardNFL />} />

            <Route path="/metaimg.png" element={<MetaImage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

function MetaImage() {
  return (
    <img
      src={"https://alumnigrid.com/image.png"}
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
      alt="Meta Preview"
    />
  );
}

export default App;
