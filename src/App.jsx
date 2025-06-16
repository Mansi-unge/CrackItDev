// App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProtectedRoute from "./Common/ProtectedRoute";
import BrowseTopic from "./Pages/BrowseTopic";
import Challenges from "./Pages/Challenges";
import Quiz from "./Pages/Quiz";
import ChallengeQuestions from "./Components/challenges/ChallengeQuestions";
import CodeEditorPage from "./Components/challenges/CodeEditorPage";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppWrapper() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login" , "/dashboard"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {!shouldHideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topics" element={<BrowseTopic />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:tech" element={<ProtectedRoute><ChallengeQuestions /></ProtectedRoute>} />
        <Route path="/compiler/:id" element={<CodeEditorPage />} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
