import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import { useEffect } from "react";
import BrowseTopic from "./Pages/BrowseTopic";
import Challenges from "./Pages/Challenges";
import Quiz from "./Pages/Quiz";
import ChallengeQuestions from "./Components/challenges/ChallengeQuestions";
import CodeEditorPage from "./Components/challenges/CodeEditorPage";
import Dashboard from "./Pages/Dashboard";

// Wrapper to use hooks like useLocation outside Router
function AppWrapper() {
  const location = useLocation();

  // Define routes where Header and Footer should be hidden
  const hideLayoutRoutes = ["/login"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Topics" element={<BrowseTopic />} />
        <Route path="/challenges" element={<Challenges/>} />
        <Route path="/challenges/:tech" element={ <ChallengeQuestions/> } />
        <Route path="/compiler/:id" element={ <CodeEditorPage/> } />
        <Route path="/Quizes" element={ <Quiz/> } />
        <Route path="/Dashboard" element={ <Dashboard/> } />
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
