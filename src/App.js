import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./Pages/Login/Login";
import Header from "./Pages/Shared/Header";

function App() {
    return (
        <div className="font-roboto">
            <Header></Header>
            <Routes>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
