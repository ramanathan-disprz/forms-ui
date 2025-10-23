import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import './App.css';


function App() {
    return (
        <Router basename="ui">

            <Routes>
                <Route path="/" element={<></>} />
            </Routes>

            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#fff",
                        color: "#333",
                        fontWeight: "initial"
                    },
                }}
            />
        </Router>
    )
}

export default App;
