import { ToastContainer } from "react-toastify";
import "./App.css";
import Header from "./Pages/Shared/Header";

function App() {
    return (
        <div>
            <Header></Header>
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
