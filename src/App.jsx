// App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedLogo from "./Components/Common/AnimatedLogo";
import AppLayout from "./AppLayout";
import "./App.css";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000); // 3s splash screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {showIntro ? (
        <div className="h-screen w-full bg-black flex items-center justify-center">
          <AnimatedLogo />
        </div>
      ) : (
        <AppLayout />
      )}
    </BrowserRouter>
  );
}

export default App;
