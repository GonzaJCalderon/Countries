import { Route, Routes } from "react-router-dom";
import Details from "./components/Details/Details";
import Landing from './components/Landing/Landing';
import CreateActivity from './components/Create Activity/Create-Activity';
import Home from "./components/Home/Home";
//import axios  from "axios";
//axios.defaults.baseURL = "http://localhost:3001"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/countries" element={<Home/>} />
        <Route path="/countries/:id" element={<Details/>} />
        <Route path="/activity" element={<CreateActivity/>}/>
      </Routes>
    </div>
  );
}

export default App;