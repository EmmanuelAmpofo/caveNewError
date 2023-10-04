import { appRoutes } from "./utils/router/Router"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./views/MainLayout";
function App() {


  return (
    <div className="app primary-500">
      <Router>
        <ToastContainer />

        <MainLayout>

        <Routes>
          {appRoutes.map(({path, element}, key) => (
            <Route path={path} element={element} key={key} />
          ))}
        </Routes>
        </MainLayout>
      </Router>
    </div>
  )
}

export default App
