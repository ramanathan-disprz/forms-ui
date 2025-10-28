import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    Outlet
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import './App.css';
import FormListView from "./pages/FormListView";
import FormControl from "./pages/FormControl";
import FormResponseView from "./pages/FormResponseView";


function App() {
    return (
        <Router basename="ui">
            <Routes>
                <Route path="/form-builder" element={<Outlet />}>
                    <Route index element={<FormListView />} />
                    <Route path="create" element={<FormControl />} />
                    <Route path="view" element={<FormResponseView />} />
                </Route>
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
