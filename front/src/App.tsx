import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" />
          <img src={reactLogo} className="framework" />
          <img src={viteLogo} className="vite" />
        </div>

        <h1>Get started</h1>

        <button
          className="counter"
          onClick={() => setCount((c) => c + 1)}
        >
          Count is {count}
        </button>

        {/* 👉 TEST CHAT LINK */}
        <a href="/chat">Go to Chat</a>
      </section>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* CHAT */}
        <Route path="/chat" element={<Chat partnerId={2} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;