import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home/Home";


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dummy" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
