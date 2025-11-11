import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages";
import QuestionProgress from "./pages/question-progress";

function App() {
    return (
    //   <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/question/progress" element={<QuestionProgress />} />
                </Route>
            </Routes>
        </Router>
    //   </AuthProvider>
    );
}

export default App;