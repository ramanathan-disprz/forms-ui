import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import './App.css';
import FormListView from "./pages/FormListView";


function App() {
    return (
        <Router basename="ui">
            <Routes>
                <Route path="/form-builder" element={<FormListView/>} />
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
