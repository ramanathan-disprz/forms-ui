import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import './App.css';
import FormListView from "./pages/FormListView";
import FormControl from "./pages/FormControl";
import LearnerFormListView from "./pages/LearnerFormListView";
import FormEditPage from "./pages/FormEditPage";
import FormViewPage from "./pages/FormViewPage";
import PreviewPage from "./pages/PreviewPage";
import SubmitAnswersPage from "./pages/SubmitAnswersPage";

function App() {
    return (
        <Router basename="ui">
            <Routes>
                <Route path="/form-builder" element={<Outlet />}>
                    <Route index element={<FormListView />} />

                    <Route path="preview/:id" element={<PreviewPage />} />
                    
                    <Route path="create" element={<FormControl />} />
                    <Route path="edit/:id" element={<FormEditPage />} />
                    <Route path="view/:id" element={<FormViewPage />} />
                </Route>
                <Route path="/forms" element={<Outlet />}>
                    <Route index element={<LearnerFormListView />} />
                    <Route path="submit/:id" element={<SubmitAnswersPage />} />
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
