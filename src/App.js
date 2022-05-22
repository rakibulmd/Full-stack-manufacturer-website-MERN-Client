import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
    return (
        <div>
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
            ;
        </div>
    );
}

export default App;
