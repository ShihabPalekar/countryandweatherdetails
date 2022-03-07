import "./styles/app.css"
import { Routes, Route, useSearchParams } from "react-router-dom"
import Info from "./pages/Info"
import InputForm from "./pages/InputForm"
import { useNavigate } from "react-router-dom";

const App : React.FC = () => {
  const navigate = useNavigate();
    const [searchParams] = useSearchParams();

  return(
    <div className="app">
            <Routes >
                <Route path="/info" element={<Info searchParams={searchParams} navigate={navigate} />} />
                <Route path="/" element={<InputForm navigate={navigate}/>} />
            </Routes>
    </div>
  )
}

export default App;