import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import Home from "./pages/Home/Home";
import BaseForm from "./components/Forms/BaseForm/BaseForm";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
